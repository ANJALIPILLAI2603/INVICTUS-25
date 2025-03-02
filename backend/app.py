from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

import sys
import os

# Ensure the correct ml_model folder is added to sys.path
ml_model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'ml_model'))
if ml_model_path not in sys.path:
    sys.path.append(ml_model_path)

try:
    from summarizer import summarize  # Import summarizer function
except ImportError:
    print("Error: Could not import summarizer.py. Ensure it's in the ml_model folder.")
    summarize = None

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes

@app.route("/", methods=["GET"])
def home():
    return "Flask server is running. Use /summarize endpoint to summarize text."

@app.route("/summarize", methods=["POST"])
def summarize_text():
    if summarize is None:
        return jsonify({"error": "Summarization module not found."}), 500

    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided for summarization."}), 400

    summary = summarize(text)  # Call the summarize function from summarizer.py
    
    # Ensure the summary is returned as a string
    if isinstance(summary, dict) and "summary" in summary:
        summary = summary["summary"]
    
    return jsonify({"summary": str(summary)})

if __name__ == "__main__":
    app.run(debug=True)
