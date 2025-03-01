from flask import Flask, request, jsonify
from matchmaking_model import find_research_matches

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return "Welcome to the AI Research Matchmaking Platform!"

@app.route("/match", methods=["POST"])
def match_researchers():
    try:
        data = request.get_json()
        user_input = data.get("research_interest", "")

        if not user_input:
            return jsonify({"error": "No research interest provided"}), 400

        matches = find_research_matches(user_input)

        if matches.empty:
            return jsonify({"message": "No suitable matches found"}), 200

        return jsonify(matches.to_dict(orient="records"))

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)  # Use a different port to avoid conflicts
