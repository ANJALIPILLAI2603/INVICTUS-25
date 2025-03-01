import pandas as pd
import pickle
from sklearn.metrics.pairwise import cosine_similarity

# Load the TF-IDF vectorizer
with open("models/tfidf_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

# Load the TF-IDF matrix
with open("models/tfidf_features.pkl", "rb") as f:
    tfidf_matrix = pickle.load(f)

# Load dataset
df = pd.read_csv(r"C:\Users\Khushi\Desktop\INVICTUS-25\ml_model\models\datasets\sample_cs_papers_cleaned.csv")


# Get user query
query = input("Enter research topic or abstract: ").lower()

# Convert query to TF-IDF vector
query_tfidf = vectorizer.transform([query])

# Compute similarity scores
similarities = cosine_similarity(query_tfidf, tfidf_matrix).flatten()

# Debug: Print similarity scores
print("Similarity Scores:", similarities)

# Get top 5 most relevant papers
top_indices = similarities.argsort()[-5:][::-1]

if similarities[top_indices[0]] == 0:
    print("\n❌ No relevant research papers found. Try a different query.")
else:
    print("\nTop Recommended Research Papers:\n")
    for idx in top_indices:
        print(f"Title: {df.iloc[idx]['title']}\nAbstract: {df.iloc[idx]['text']}\nScore: {similarities[idx]:.4f}\n")
