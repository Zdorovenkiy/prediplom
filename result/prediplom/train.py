import os
import time
import psutil
import torch
from datetime import datetime, timedelta
from datasets import load_from_disk
from transformers import (
    AutoTokenizer,
    AutoModelForSeq2SeqLM,
    Seq2SeqTrainingArguments,
    Seq2SeqTrainer,
    DataCollatorForSeq2Seq,
)
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
import evaluate

MODEL_NAME = "google/flan-t5-small"
DATA_DIR = "data/processed"
OUTPUT_DIR = "saved_model"
EPOCHS = 3
LEARNING_RATE = 3e-4
MAX_SOURCE_LENGTH = 256
MAX_TARGET_LENGTH = 128
USE_8BIT = True
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
BATCH_SIZE = 8 
FP16 = True

LOG_DIR = "training_logs"
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(LOG_DIR, exist_ok=True)

log_file = os.path.join(LOG_DIR, f"training_log_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt")


def log_message(message, level="INFO"):
    """Запись сообщения в лог-файл и вывод в консоль"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_entry = f"[{timestamp}] [{level}] {message}"

    print(log_entry)

    with open(log_file, "a", encoding="utf-8") as f:
        f.write(log_entry + "\n")


def get_system_info():
    """Получение информации о системе"""
    info = []

    cpu_percent = psutil.cpu_percent(interval=1)
    cpu_count = psutil.cpu_count()
    info.append(f"CPU: {cpu_count} cores, Использование: {cpu_percent}%")

    ram = psutil.virtual_memory()
    info.append(
        f"RAM: Всего: {ram.total / 1024 ** 3:.1f}GB, Используется: {ram.percent}%, Свободно: {ram.available / 1024 ** 3:.1f}GB")

    if torch.cuda.is_available():
        gpu_count = torch.cuda.device_count()
        info.append(f"GPU: {gpu_count} устройств(а)")

        for i in range(gpu_count):
            gpu_name = torch.cuda.get_device_name(i)
            gpu_mem = torch.cuda.get_device_properties(i).total_memory / 1024 ** 3
            info.append(f"  GPU {i}: {gpu_name}, Память: {gpu_mem:.1f}GB")
    else:
        info.append("GPU: Не доступен (используется CPU)")

    return "\n".join(info)


def get_training_parameters_info(model, tokenized_ds):
    """Информация о параметрах обучения"""
    total_params = sum(p.numel() for p in model.parameters())
    trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)
    non_trainable_params = total_params - trainable_params

    info = []
    info.append("=" * 80)
    info.append("ПАРАМЕТРЫ ОБУЧЕНИЯ")
    info.append("=" * 80)
    info.append(f"Модель: {MODEL_NAME}")
    info.append(f"Устройство: {DEVICE}")
    info.append(f"8-bit обучение: {USE_8BIT}")
    info.append(f"Размер батча: {BATCH_SIZE}")
    info.append(f"Эпохи: {EPOCHS}")
    info.append(f"Learning rate: {LEARNING_RATE}")
    info.append(f"Макс. длина входных данных: {MAX_SOURCE_LENGTH}")
    info.append(f"Макс. длина целевых данных: {MAX_TARGET_LENGTH}")
    info.append(f"Размер обучающего набора: {len(tokenized_ds)} примеров")
    info.append(f"Всего параметров модели: {total_params:,}")
    info.append(f"Обучаемых параметров: {trainable_params:,} ({trainable_params / total_params * 100:.2f}%)")
    info.append(f"Необучаемых параметров: {non_trainable_params:,}")
    info.append("=" * 80)

    return "\n".join(info)


class Timer:
    """Класс для измерения времени выполнения"""

    def __init__(self, name="Операция"):
        self.name = name
        self.start_time = None
        self.end_time = None

    def __enter__(self):
        self.start_time = time.time()
        log_message(f"Начало: {self.name}")
        return self

    def __exit__(self, *args):
        self.end_time = time.time()
        elapsed = self.end_time - self.start_time
        elapsed_str = str(timedelta(seconds=int(elapsed)))
        log_message(f"Завершено: {self.name} | Затрачено времени: {elapsed:.2f} секунд ({elapsed_str})")

    def get_elapsed(self):
        if self.start_time and self.end_time:
            return self.end_time - self.start_time
        return time.time() - self.start_time if self.start_time else 0


log_message("=" * 80)
log_message("ЗАПУСК ОБУЧЕНИЯ МОДЕЛИ")
log_message("=" * 80)

log_message("СИСТЕМНАЯ ИНФОРМАЦИЯ:")
log_message(get_system_info())

with Timer("Загрузка данных"):
    ds = load_from_disk(DATA_DIR)
    log_message(f"Загружен датасет из {DATA_DIR}")
    log_message(f"Количество примеров: {len(ds)}")
    log_message(f"Колонки датасета: {ds.column_names}")

with Timer("Загрузка токенизатора"):
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, use_fast=True)
    log_message(f"Токенизатор загружен: {MODEL_NAME}")
    log_message(f"Размер словаря: {tokenizer.vocab_size}")


def preprocess(example):
    """Предобработка примеров"""
    model_inputs = tokenizer(
        example["input"],
        truncation=True,
        max_length=MAX_SOURCE_LENGTH,
        padding="max_length"
    )
    labels = tokenizer(
        example["target"],
        truncation=True,
        max_length=MAX_TARGET_LENGTH,
        padding="max_length"
    )
    model_inputs["labels"] = labels["input_ids"]
    return model_inputs


with Timer("Токенизация данных"):
    tokenized = ds.map(
        preprocess,
        remove_columns=ds.column_names,
        desc="Токенизация данных"
    )
    log_message(f"Токенизация завершена. Размер: {len(tokenized)}")

with Timer("Загрузка модели"):
    if USE_8BIT:
        log_message("Загрузка модели в 8-bit режиме...")
        model = AutoModelForSeq2SeqLM.from_pretrained(
            MODEL_NAME,
            load_in_8bit=True,
            device_map="auto",
            torch_dtype=torch.float16
        )
        model = prepare_model_for_kbit_training(model)
        log_message("Модель подготовлена для k-bit обучения")
    else:
        model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
        model.to(DEVICE)
        log_message(f"Модель перемещена на {DEVICE}")

with Timer("Настройка LoRA"):
    lora_config = LoraConfig(
        r=16,
        lora_alpha=32,
        target_modules=["q", "k", "v", "o", "wi", "wo", "wi_0"],
        lora_dropout=0.05,
        bias="none",
        task_type="SEQ_2_SEQ_LM"
    )

    model = get_peft_model(model, lora_config)

    total_params = sum(p.numel() for p in model.parameters())
    trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)

    log_message(f"LoRA конфигурация применена")
    log_message(f"Всего параметров: {total_params:,}")
    log_message(f"Обучаемых параметров (LoRA): {trainable_params:,} ({trainable_params / total_params * 100:.2f}%)")

log_message(get_training_parameters_info(model, tokenized))

data_collator = DataCollatorForSeq2Seq(tokenizer, model=model)

rouge = evaluate.load("rouge")


def compute_metrics(eval_pred):
    """Вычисление метрик ROUGE"""
    preds, labels = eval_pred

    decoded_preds = tokenizer.batch_decode(preds, skip_special_tokens=True)
    decoded_labels = tokenizer.batch_decode(labels, skip_special_tokens=True)

    result = rouge.compute(
        predictions=decoded_preds,
        references=decoded_labels,
        use_stemmer=True
    )

    return {k: round(v, 4) for k, v in result.items()}


from transformers import TrainerCallback


class TrainingMonitorCallback(TrainerCallback):
    """Callback для мониторинга процесса обучения"""

    def on_log(self, args, state, control, logs=None, **kwargs):
        if logs:
            log_message(f"Шаг {state.global_step}: {logs}")

    def on_epoch_end(self, args, state, control, **kwargs):
        log_message(f"Завершена эпоха {state.epoch}/{EPOCHS}")

        if torch.cuda.is_available():
            for i in range(torch.cuda.device_count()):
                allocated = torch.cuda.memory_allocated(i) / 1024 ** 3
                reserved = torch.cuda.memory_reserved(i) / 1024 ** 3
                log_message(f"GPU {i} память: выделено {allocated:.2f}GB, зарезервировано {reserved:.2f}GB")

        cpu_percent = psutil.cpu_percent()
        ram = psutil.virtual_memory()
        log_message(f"CPU использование: {cpu_percent}%, RAM использование: {ram.percent}%")

    def on_train_end(self, args, state, control, **kwargs):
        total_time = state.log_history[-1]["train_runtime"] if state.log_history else 0
        log_message(f"Общее время обучения: {total_time:.2f} секунд")
        log_message(f"Общее количество шагов: {state.global_step}")


training_args = Seq2SeqTrainingArguments(
    output_dir=OUTPUT_DIR,
    per_device_train_batch_size=BATCH_SIZE,
    per_device_eval_batch_size=BATCH_SIZE,
    predict_with_generate=True,
    eval_strategy="epoch",
    save_strategy="epoch",
    logging_strategy="steps",
    logging_steps=100,
    logging_dir=LOG_DIR,    
    num_train_epochs=EPOCHS,
    learning_rate=LEARNING_RATE,
    fp16=True,
    gradient_accumulation_steps=2,
    save_total_limit=3,
    remove_unused_columns=True,
    report_to="none",
    load_best_model_at_end=True,
    metric_for_best_model="rougeL",
    greater_is_better=True,
    push_to_hub=False,
    log_level="info",
)

eval_size = 1000 
eval_dataset = tokenized.select(range(eval_size))

trainer = Seq2SeqTrainer(
    model=model,
    args=training_args,
    train_dataset=tokenized,
    eval_dataset=eval_dataset,
    tokenizer=tokenizer,
    data_collator=data_collator,
    compute_metrics=compute_metrics,
    callbacks=[TrainingMonitorCallback()]
)

log_message("=" * 80)
log_message("НАЧАЛО ОБУЧЕНИЯ МОДЕЛИ")
log_message("=" * 80)

training_start_time = time.time()

try:
    with Timer("Обучение модели"):
        trainer.train()

    training_end_time = time.time()
    total_training_time = training_end_time - training_start_time

    log_message("=" * 80)
    log_message("ОБУЧЕНИЕ ЗАВЕРШЕНО")
    log_message("=" * 80)
    log_message(f"Общее время обучения: {total_training_time:.2f} секунд")
    log_message(f"Среднее время на эпоху: {total_training_time / EPOCHS:.2f} секунд")

    log_message("Выполнение финальной оценки...")
    eval_results = trainer.evaluate()
    log_message(f"Финальные метрики: {eval_results}")

    log_message("Сохранение лучшей модели...")
    trainer.save_model(OUTPUT_DIR)

except Exception as e:
    log_message(f"ОШИБКА во время обучения: {str(e)}", level="ERROR")
    import traceback

    log_message(traceback.format_exc(), level="ERROR")
    raise

finally:
    if torch.cuda.is_available():
        torch.cuda.empty_cache()
        torch.cuda.synchronize()
        log_message("Память GPU очищена")

with Timer("Сохранение модели и токенизатора"):
    model.save_pretrained(OUTPUT_DIR)
    log_message(f"Веса PEFT сохранены в {OUTPUT_DIR}")

    tokenizer.save_pretrained(OUTPUT_DIR)
    log_message(f"Токенизатор сохранен в {OUTPUT_DIR}")

    config_info = {
        "model_name": MODEL_NAME,
        "batch_size": BATCH_SIZE,
        "epochs": EPOCHS,
        "learning_rate": LEARNING_RATE,
        "max_source_length": MAX_SOURCE_LENGTH,
        "max_target_length": MAX_TARGET_LENGTH,
        "use_8bit": USE_8BIT,
        "total_training_time_seconds": total_training_time,
        "training_completed_at": datetime.now().isoformat()
    }

    import json

    config_file = os.path.join(OUTPUT_DIR, "training_config.json")
    with open(config_file, "w", encoding="utf-8") as f:
        json.dump(config_info, f, indent=2, ensure_ascii=False)

    log_message(f"Конфигурация обучения сохранена в {config_file}")

log_message("=" * 80)
log_message("ОБУЧЕНИЕ УСПЕШНО ЗАВЕРШЕНО!")
log_message(f"Модель сохранена в: {OUTPUT_DIR}")
log_message(f"Логи сохранены в: {log_file}")
log_message("=" * 80)

print("\n" + "=" * 80)
print("СВОДНАЯ ИНФОРМАЦИЯ:")
print("=" * 80)
print(f"Общее время обучения: {total_training_time:.2f} секунд")
print(f"Время на эпоху: {total_training_time / EPOCHS:.2f} секунд")
print(f"Обучаемых параметров: {trainable_params:,}")
print(f"Финальные метрики ROUGE:")
if 'eval_rouge1' in eval_results:
    print(f"  ROUGE-1: {eval_results['eval_rouge1']:.4f}")
if 'eval_rouge2' in eval_results:
    print(f"  ROUGE-2: {eval_results['eval_rouge2']:.4f}")
if 'eval_rougeL' in eval_results:
    print(f"  ROUGE-L: {eval_results['eval_rougeL']:.4f}")
print("=" * 80)