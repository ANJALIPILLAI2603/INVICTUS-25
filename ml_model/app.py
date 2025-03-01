import pandas as pd
import numpy as np
import nltk
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.corpus import stopwords
import nltk

# Initialize Flask app
app = Flask(__name__)

# Download necessary NLTK data
nltk.download("stopwords")
nltk.download("punkt")

# Load the dataset
try:
    research_data_file = "sample_cs_papers_cleaned.csv"  # Update the path if needed
    df = pd.read_csv(research_data_file)
except FileNotFoundError:
    df = None
    print(f"Error: File '{research_data_file}' not found. Please upload the correct dataset.")

# Text Preprocessing Function
def preprocess_text(text):
    if pd.isna(text):  # Handle missing values
        return ""
    stop_words = set(stopwords.words("english"))
    words = nltk.word_tokenize(text.lower())
    return " ".join([word for word in words if word.isalnum() and word not in stop_words])

# Recommendation Function
def recommend_research(query, df, top_n=5):
    # Ensure that the dataset is available
    if df is None:
        return {"error": "Dataset not loaded or incorrect."}

    # Apply text preprocessing if dataset is loaded
    df["processed_text"] = df["cleaned_text"].fillna("").apply(preprocess_text)

    # TF-IDF Transformation
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(df["processed_text"])

    # Vectorize the query input
    query_vec = vectorizer.transform([preprocess_text(query)])

    # Calculate cosine similarities
    similarities = cosine_similarity(query_vec, tfidf_matrix)

    # Get top N results
    top_indices = np.argsort(similarities[0])[::-1][:top_n]

    return df.iloc[top_indices][["title", "cleaned_text"]].to_dict(orient="records")

# Route to recommend papers based on a research query
@app.route("/recommend", methods=["POST"])
def recommend_papers():
    if df is None:
        return jsonify({"error": "Research dataset not loaded. Please check the file path."}), 500

    data = request.get_json()
    query = data.get("query", "")
    if not query:
        return jsonify({"error": "No query provided"}), 400

    results = recommend_research(query, df)
    return jsonify(results)

# Simple test route
@app.route('/')
def hello_world():
    return 'Hello, World!'

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
