import React, { useState } from "react";
import axios from "axios"; // For making API requests
import "./MatchmakingPage.css"; // Optional: Add styles

const MatchmakingPage = () => {
  const [researchInterest, setResearchInterest] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMatchmaking = async () => {
    if (!researchInterest.trim()) {
      setError("Please enter your research interest.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5001/match", {
        research_interest: researchInterest,
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setMatches(response.data);
      }
    } catch (err) {
      setError("An error occurred while fetching matches.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="matchmaking-page">
      <h1>Research Matchmaking</h1>
      <p>Enter your research interest to find collaborators:</p>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your research interest..."
          value={researchInterest}
          onChange={(e) => setResearchInterest(e.target.value)}
        />
        <button onClick={handleMatchmaking} disabled={loading}>
          {loading ? "Finding Matches..." : "Find Matches"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {matches.length > 0 && (
        <div className="matches-container">
          <h2>Top Matches</h2>
          <ul>
            {matches.map((match, index) => (
              <li key={index} className="match-card">
                <h3>{match.name}</h3>
                <p><strong>Research Interests:</strong> {match.research_interests}</p>
                <p><strong>Similarity Score:</strong> {match.similarity_score.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MatchmakingPage;