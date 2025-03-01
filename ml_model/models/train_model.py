import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle

# Load research dataset
df = pd.read_csv(r"C:\Users\Khushi\Desktop\INVICTUS-25\ml_model\models\datasets\sample_cs_papers_cleaned.csv")  # Make sure this file exists

# Extract text content for processing
documents = df["cleaned_text"].fillna("")  # Or use df["text"] if needed

# Convert text into TF-IDF vectors
vectorizer = TfidfVectorizer(stop_words="english", max_features=5000)
tfidf_matrix = vectorizer.fit_transform(documents)

# Save TF-IDF features & vectorizer
with open("models/tfidf_vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

with open("models/tfidf_features.pkl", "wb") as f:
    pickle.dump(tfidf_matrix, f)

print("✅ TF-IDF model trained and saved.")
