from fastapi import FastAPI
from pydantic import BaseModel
import torch
from infer import load_peft_model_for_inference, generate_with_parameters

app = FastAPI()

MODEL_PATH = "saved_model"
model, tokenizer, _ = load_peft_model_for_inference(MODEL_PATH)


class GenerateRequest(BaseModel):
    review_text: str


class GenerateResponse(BaseModel):
    response: str


@app.post("/generate", response_model=GenerateResponse)
def generate(req: GenerateRequest):
    prompt = f"""
You represent the 
company. Respond politely and professionally to a customer's comment. 
Comment is "{req.review_text}"
"""

    answer = generate_with_parameters(
        model,
        tokenizer,
        prompt,
        num_beams=5,
        do_sample=True,
        max_length=150
    )

    return {"response": answer}
