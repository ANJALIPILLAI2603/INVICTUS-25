import pandas as pd
import numpy as np
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nltk.download("stopwords")
from nltk.corpus import stopwords

# Load research data
df = pd.read_csv("research_data.csv")

# Text Preprocessing Function
def preprocess_text(text):
    stop_words = set(stopwords.words("english"))
    words = nltk.word_tokenize(text.lower())
    return " ".join([word for word in words if word.isalnum() and word not in stop_words])

# Apply text processing
df["processed_text"] = df["abstract"].apply(preprocess_text) + " " + df["keywords"].apply(preprocess_text)

# TF-IDF Transformation
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(df["processed_text"])

# Recommendation Function
def recommend_research(query, top_n=5):
    query_vec = vectorizer.transform([preprocess_text(query)])
    similarities = cosine_similarity(query_vec, tfidf_matrix)
    top_indices = np.argsort(similarities[0])[::-1][:top_n]
    return df.iloc[top_indices][["title", "abstract", "keywords"]].to_dict(orient="records")
