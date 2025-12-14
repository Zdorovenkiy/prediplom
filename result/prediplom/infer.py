
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from peft import PeftModel, PeftConfig
import warnings

warnings.filterwarnings("ignore")


def load_peft_model_for_inference(model_path, device=None):
    """Загрузка PEFT модели для инференса с диагностикой"""
    if device is None:
        device = "cuda" if torch.cuda.is_available() else "cpu"

    print(f"Загрузка модели из: {model_path}")
    print(f"Устройство: {device}")

    try:
        config = PeftConfig.from_pretrained(model_path)
        print(f"Базовая модель: {config.base_model_name_or_path}")
        print(f"Задача: {config.task_type}")

        tokenizer = AutoTokenizer.from_pretrained(model_path)
        print(f"Размер словаря: {tokenizer.vocab_size}")

        print("Загрузка базовой модели...")
        base_model = AutoModelForSeq2SeqLM.from_pretrained(
            config.base_model_name_or_path,
            device_map="auto" if device == "cuda" else None,
            torch_dtype=torch.float32 
        )

        print("Загрузка PEFT адаптеров...")
        model = PeftModel.from_pretrained(base_model, model_path)

        if device == "cpu":
            model = model.to(device)
            model = model.float() 

        model.eval()
        print(f"Модель загружена успешно!")
        print(f"Архитектура: {model.config.model_type}")

        return model, tokenizer, config

    except Exception as e:
        print(f"Ошибка при загрузке модели: {e}")
        raise


def test_model_capabilities(model, tokenizer):
    """Тестирование возможностей модели"""
    print("\n" + "=" * 50)
    print("ТЕСТИРОВАНИЕ МОДЕЛИ")
    print("=" * 50)

    test_inputs = [
        "What is the capital of France?",
        "Какая столица Франции?",
        "Translate to English: Привет, как дела?",
        "Summarize: Machine learning is a subset of artificial intelligence that enables computers to learn from data without being explicitly programmed.",
        "Answer the question: What is 2+2?"
    ]

    for text in test_inputs:
        print(f"\nВход: {text}")
        inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=256)

        device = model.device
        inputs = {k: v.to(device) for k, v in inputs.items()}

        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_length=100,
                num_beams=5, 
                early_stopping=True,
                no_repeat_ngram_size=2,
                temperature=1.0,
                do_sample=False 
            )

        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        print(f"Ответ: {response}")

    print("=" * 50)


def generate_with_parameters(model, tokenizer, text, **kwargs):
    """Генерация с различными параметрами"""
    default_params = {
        'max_length': 100,
        'min_length': 10,
        'num_beams': 5,
        'temperature': 1.0,
        'top_p': 0.95,
        'do_sample': False,
        'early_stopping': True,
        'no_repeat_ngram_size': 2,
        'length_penalty': 1.0,
    }

    params = {**default_params, **kwargs}

    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=256)
    device = model.device
    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            **params
        )

    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response


def main():
    MODEL_PATH = "saved_model"  

    model, tokenizer, config = load_peft_model_for_inference(MODEL_PATH)

    test_model_capabilities(model, tokenizer)

    print("\n" + "=" * 50)
    print("ИНТЕРАКТИВНЫЙ РЕЖИМ")
    print("=" * 50)
    print("Введите текст для генерации (или 'quit' для выхода)")
    print("-" * 50)

    while True:
        user_input = input("\n>>> ").strip()

        if user_input.lower() in ['quit', 'exit', 'выход']:
            break

        if not user_input:
            continue

        try:
            print("\nПопытка 1 (beam search):")
            response1 = generate_with_parameters(
                model, tokenizer, user_input,
                num_beams=5, do_sample=False
            )
            print(f"Ответ: {response1}")

            print("\nПопытка 2 (сэмплирование):")
            response2 = generate_with_parameters(
                model, tokenizer, user_input,
                num_beams=1, do_sample=True, temperature=0.8
            )
            print(f"Ответ: {response2}")

            print("\nПопытка 3 (greedy decoding):")
            response3 = generate_with_parameters(
                model, tokenizer, user_input,
                num_beams=1, do_sample=False
            )
            print(f"Ответ: {response3}")

        except Exception as e:
            print(f"Ошибка: {e}")


if __name__ == "__main__":
    main()