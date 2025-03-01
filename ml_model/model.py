import pandas as pd
<<<<<<< HEAD
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Sample dataset of researchers with their interests
data = {
    "name": ["Alice Johnson", "Bob Smith", "Charlie Davis", "David Lee"],
    "research_interests": [
        "Deep Learning, Computer Vision, Neural Networks",
        "Natural Language Processing, AI Ethics, Chatbots",
        "Reinforcement Learning, Robotics, AI Safety",
        "Machine Learning, Data Science, Big Data"
    ]
}

# Convert dataset to DataFrame
df = pd.DataFrame(data)

# TF-IDF Vectorization
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(df["research_interests"])

def find_research_matches(user_interest, top_n=3):
    """
    Finds the top N researchers whose interests match the user input.

    Args:
        user_interest (str): User's research interest.
        top_n (int): Number of matches to return.

    Returns:
        pd.DataFrame: Top matching researchers.
    """
    user_vector = vectorizer.transform([user_interest])
    similarities = cosine_similarity(user_vector, tfidf_matrix).flatten()
    
    # Sort researchers by similarity score
    df["similarity_score"] = similarities
    top_matches = df.sort_values(by="similarity_score", ascending=False).head(top_n)
    
    return top_matches[["name", "research_interests", "similarity_score"]]
=======
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
>>>>>>> 5f53e372fb03a29adb591e44e765aac24a14b0cf
