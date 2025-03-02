import sys
import json
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Load model and tokenizer
model_name = "facebook/bart-large-cnn"

tokenizer = AutoTokenizer.from_pretrained(model_name)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

model = AutoModelForSeq2SeqLM.from_pretrained(model_name, torch_dtype=torch_dtype).to(device)
model.eval()

def chunk_text(text, max_length=512):
    """Splits long text into smaller chunks for better summarization."""
    tokens = tokenizer.encode(text, truncation=False)
    return [tokenizer.decode(tokens[i : i + max_length]) for i in range(0, len(tokens), max_length)]

def summarize(text):
    print("Processing text...")  

    chunks = chunk_text(text)  # Handle long inputs
    summaries = []

    with torch.no_grad():
        for chunk in chunks:
            inputs = tokenizer(chunk, return_tensors="pt", truncation=True, padding="longest", max_length=512).to(device)
            summary_ids = model.generate(
                inputs["input_ids"], 
                max_length=100, 
                min_length=30, 
                num_beams=4
            )
            summaries.append(tokenizer.decode(summary_ids[0], skip_special_tokens=True))
    
    return " ".join(summaries)  # Merge chunks if needed

if __name__ == "__main__":
    input_text = sys.stdin.read().strip()
    
    if not input_text:
        print(json.dumps({"error": "No input received"}))
    else:
        try:
            print(f"Input Text: {input_text}")  # Debugging step
            summary = summarize(input_text)
            print(json.dumps({"summary": summary}, ensure_ascii=False))
        except Exception as e:
            print(json.dumps({"error": str(e)}))  # ✅ Removed extra ')'
