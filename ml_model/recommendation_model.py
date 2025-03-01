import pandas as pd
import numpy as np
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Download necessary NLTK data
nltk.download("stopwords")
nltk.download("punkt")
from nltk.corpus import stopwords

# Load research data
try:
    research_data_file = "sample_cs_papers_cleaned.csv"  # Ensure the correct file name
    df = pd.read_csv(research_data_file)
    print(f"✅ Successfully loaded '{research_data_file}'")
except FileNotFoundError:
    print(f"❌ Error: File '{research_data_file}' not found.")
    df = None

# Ensure required columns exist
required_columns = {"title", "cleaned_text"}  # Adjust based on actual dataset
if df is not None and not required_columns.issubset(df.columns):
    missing = required_columns - set(df.columns)
    print(f"❌ Error: Missing columns in dataset: {missing}")
    df = None

# Text Preprocessing Function
def preprocess_text(text):
    if pd.isna(text):  # Handle missing values
        return ""
    stop_words = set(stopwords.words("english"))
    words = nltk.word_tokenize(text.lower())
    return " ".join([word for word in words if word.isalnum() and word not in stop_words])

# Apply text processing if dataset is loaded
if df is not None:
    df["processed_text"] = df["cleaned_text"].fillna("").apply(preprocess_text)

    # TF-IDF Transformation
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(df["processed_text"])

# Recommendation Function
def recommend_research(query, top_n=5):
    if df is None:
        return {"error": "Dataset not loaded or incorrect."}

    query_vec = vectorizer.transform([preprocess_text(query)])
    similarities = cosine_similarity(query_vec, tfidf_matrix)
    top_indices = np.argsort(similarities[0])[::-1][:top_n]

    return df.iloc[top_indices][["title", "cleaned_text"]].to_dict(orient="records")
