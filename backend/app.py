from flask import Flask, request, jsonify
import subprocess
import json

app = Flask(__name__)

# Function to call model.py externally
def summarize_text(text):
    try:
        result = subprocess.run(
            ["python", "model.py"],
            input=text.encode(),
            capture_output=True,
            text=True,
            timeout=30  # Prevent long executions
        )
        return json.loads(result.stdout)["summary"]
    except Exception as e:
        return str(e)

@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.get_json()
    text = data.get("text", "").strip()

    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        # Limit input size to prevent crashes
        if len(text) > 5000:  # Adjust limit based on testing
            return jsonify({"error": "Text too long. Please limit to 5000 characters."}), 400
        
        summary = summarize_text(text)
        return jsonify({"summary": summary})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
