import sys
import json
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Load model and tokenizer once to prevent reloading
MODEL_NAME = "facebook/bart-large-cnn"
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
TORCH_DTYPE = torch.float16 if torch.cuda.is_available() else torch.float32

try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME, torch_dtype=TORCH_DTYPE).to(DEVICE)
    model.eval()
except Exception as e:
    print(json.dumps({"error": f"Model loading failed: {str(e)}"}))
    sys.exit(1)

def chunk_text(text, max_length=512):
    """Splits long text into smaller chunks for better summarization."""
    tokens = tokenizer.encode(text, truncation=False)
    return [tokenizer.decode(tokens[i : i + max_length]) for i in range(0, len(tokens), max_length)]

def summarize(text):
    """Summarizes input text using the BART model."""
    if not text.strip():
        return {"error": "No text provided for summarization."}

    print("Processing text...")  
    summaries = []

    try:
        chunks = chunk_text(text)

        with torch.no_grad():
            for chunk in chunks:
                inputs = tokenizer(chunk, return_tensors="pt", truncation=True, padding="longest", max_length=512).to(DEVICE)
                summary_ids = model.generate(
                    inputs["input_ids"], 
                    max_length=100, 
                    min_length=30, 
                    num_beams=4
                )
                summaries.append(tokenizer.decode(summary_ids[0], skip_special_tokens=True))
        
        return {"summary": " ".join(summaries)}
    
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    input_text = sys.stdin.read().strip()
    
    if not input_text:
        print(json.dumps({"error": "No input received"}))
    else:
        try:
            print(json.dumps(summarize(input_text), ensure_ascii=False))
        except Exception as e:
            print(json.dumps({"error": str(e)}))
