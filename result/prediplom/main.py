import json
from datasets import Dataset
from pathlib import Path

INPUT = "data/dataset/main.jsonl"
OUTPUT = "data/processed_dataset.arrow"

def load_jsonl(path):
    records = []
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line=line.strip()
            if not line:
                continue
            records.append(json.loads(line))
    return records

def build_prompt(rec):
    tone = rec.get("tone", "friendly")
    rating = rec.get("rating", "")
    context = rec.get("context", "")
    prompt = (
        f"Инструкция: Ответь на отзыв в тоне {tone}, кратко и вежливо.\n"
        f"Отзыв: {rec['review_text']}\n"
        f"Рейтинг: {rating}\n"
        f"Контекст: {context}\n\nОтвет:"
    )
    return prompt

def main():
    records = load_jsonl(INPUT)
    data = []
    for r in records:
        prompt = build_prompt(r)
        target = r.get("response", "")
        if not target:
            continue
        data.append({"input": prompt, "target": target})
    ds = Dataset.from_list(data)
    ds.save_to_disk("data/processed")
    print(f"Saved processed dataset with {len(data)} samples to data/processed")

if __name__ == "__main__":
    main()
