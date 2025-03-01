import pandas as pd
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
