from flask import Flask, request, jsonify
from model import recommend_research

app = Flask(__name__)

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    query = data.get("query", "")
    results = recommend_research(query)
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
