import json
import matplotlib.pyplot as plt
import seaborn as sns
from collections import Counter
import pandas as pd
from datasets import Dataset
import numpy as np

plt.style.use('seaborn-v0_8-darkgrid')
sns.set_palette("husl")

INPUT = "data/dataset/Lazada.json"
OUTPUT_DIR = "data/processed"


def load_data_json(path):
    with open(path, "r", encoding="utf-8") as f:
        raw = json.load(f)

    records = []
    lazada_block = raw.get("Lazada", {})

    for _, rec in lazada_block.items():
        records.append(rec)

    return records


def build_prompt(rec):
    rating = rec.get("score", "")
    thumbs_up = rec.get("thumbsUpCount", "")
    app_version = rec.get("appVersion", "")
    review_text = rec.get("content", "").strip()

    prompt = (
        "Instruction: Write a polite and professional response to the customer review.\n"
        f"Review: {review_text}\n"
        f"Rating: {rating}\n"
        f"Helpful votes: {thumbs_up}\n"
        f"App version: {app_version}\n\n"
        "Response:"
    )
    return prompt


def visualize_dataset(data):
    """Визуализация характеристик датасета"""
    df = pd.DataFrame(data)

    records = load_data_json(INPUT)
    filtered_records = [rec for rec in records
                        if rec.get("content", "") and rec.get("replyContent", "")]

    ratings = [rec.get("score", 0) for rec in filtered_records]
    rating_counts = Counter(ratings)

    review_lengths = [len(str(rec.get("content", ""))) for rec in filtered_records]
    response_lengths = [len(str(rec.get("replyContent", ""))) for rec in filtered_records]

    fig, axes = plt.subplots(1, 3, figsize=(15, 5))
    fig.suptitle('Визуализация датасета', fontsize=16, fontweight='bold')

    ax1 = axes[0]
    sorted_ratings = sorted(rating_counts.items())
    ratings_list = [str(r[0]) for r in sorted_ratings]
    counts_list = [r[1] for r in sorted_ratings]

    bars = ax1.bar(ratings_list, counts_list, color=sns.color_palette("husl", len(ratings_list)))
    ax1.set_title('Распределение рейтингов', fontsize=12, fontweight='bold')
    ax1.set_xlabel('Рейтинг')
    ax1.set_ylabel('Количество')
    ax1.tick_params(axis='x', rotation=45)

    for bar in bars:
        height = bar.get_height()
        ax1.text(bar.get_x() + bar.get_width() / 2., height + 0.5,
                 f'{int(height)}', ha='center', va='bottom', fontsize=9)

    ax2 = axes[1]
    ax2.hist(review_lengths, bins=30, alpha=0.7, edgecolor='black')
    ax2.set_title('Распределение длины отзывов', fontsize=12, fontweight='bold')
    ax2.set_xlabel('Длина отзыва (символы)')
    ax2.set_ylabel('Частота')
    ax2.axvline(np.mean(review_lengths), color='red', linestyle='--',
                label=f'Среднее: {np.mean(review_lengths):.0f}')
    ax2.legend()

    ax3 = axes[2]
    ax3.hist(response_lengths, bins=30, alpha=0.7, edgecolor='black', color='orange')
    ax3.set_title('Распределение длины ответов', fontsize=12, fontweight='bold')
    ax3.set_xlabel('Длина ответа (символы)')
    ax3.set_ylabel('Частота')
    ax3.axvline(np.mean(response_lengths), color='red', linestyle='--',
                label=f'Среднее: {np.mean(response_lengths):.0f}')
    ax3.legend()

    plt.tight_layout()
    plt.savefig('data/processed/dataset_visualization.png', dpi=300, bbox_inches='tight')
    plt.show()

    print("=" * 60)
    print("СТАТИСТИКА ДАТАСЕТА")
    print("=" * 60)
    print(f"Всего записей: {len(filtered_records)}")
    print(f"Средняя длина отзыва: {np.mean(review_lengths):.0f} символов")
    print(f"Средняя длина ответа: {np.mean(response_lengths):.0f} символов")
    print("\nРаспределение рейтингов:")
    for rating, count in sorted_ratings:
        percentage = (count / len(filtered_records)) * 100
        print(f"  Рейтинг {rating}: {count} записей ({percentage:.1f}%)")

    return df


def main():
    records = load_data_json(INPUT)
    data = []

    for rec in records:
        review_text = rec.get("content", "")
        response_text = rec.get("replyContent", "")

        if not review_text or not response_text:
            continue

        prompt = build_prompt(rec)

        data.append({
            "input": prompt,
            "target": response_text
        })

    if not data:
        raise ValueError("Пустой датасет")

    print("Генерация визуализаций...")
    df_analysis = visualize_dataset(data)

    stats_path = 'data/processed/dataset_statistics.txt'
    with open(stats_path, 'w', encoding='utf-8') as f:
        f.write("Сатистика датасета\n")
        f.write("=" * 50 + "\n")
        f.write(f"Всего записей: {len(data)}\n")
        f.write(f"Размер датасета: {len(data)} пар (промпт-ответ)\n")
        f.write(f"Пример промпта:\n{data[0]['input'][:200]}...\n")
        f.write(f"Пример ответа:\n{data[0]['target'][:200]}...\n")

    ds = Dataset.from_list(data)
    ds.save_to_disk(OUTPUT_DIR)

    print(f"\nСохранен датасет с количеством строк {len(data)} в {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
