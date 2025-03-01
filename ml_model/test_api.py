import requests

url = "http://127.0.0.1:5000/match"
data = {"research_interest": "Machine Learning, AI, Deep Learning"}

response = requests.post(url, json=data)
print(response.json())