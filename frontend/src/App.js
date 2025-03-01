import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

// Simulated data for research recommendations and researcher matchmaking
const recommendationData = [
  { title: "Deep Learning for Computer Vision", cleaned_text: "This paper discusses deep learning approaches for computer vision tasks...", similarity_score: 0.95 },
  { title: "Natural Language Processing with Transformers", cleaned_text: "Explores the power of transformers for NLP tasks...", similarity_score: 0.92 },
];

const matchmakingData = [
  { name: "Alice Johnson", research_interests: "Deep Learning, Computer Vision, Neural Networks", similarity_score: 0.95 },
  { name: "Bob Smith", research_interests: "Natural Language Processing, AI Ethics, Chatbots", similarity_score: 0.92 },
];

function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" // Check for stored theme preference
  );
  const [query, setQuery] = useState("");
  const [researchResults, setResearchResults] = useState([]);
  const [matchResults, setMatchResults] = useState([]);

  // Apply dark mode settings on page load
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode); // Apply dark-mode class to body
    localStorage.setItem("theme", darkMode ? "dark" : "light"); // Store theme preference in localStorage
  }, [darkMode]);

  // Handle search for research recommendations
  const handleResearchSearch = () => {
    const results = recommendationData.filter(paper => paper.title.toLowerCase().includes(query.toLowerCase()));
    setResearchResults(results);
  };

  // Handle research matchmaking
  const handleMatchmakingSearch = () => {
    const results = matchmakingData.filter(researcher => researcher.research_interests.toLowerCase().includes(query.toLowerCase()));
    setMatchResults(results);
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : ""}`}>
      {/* Navbar */}
      <nav className="navbar">
        <h2>ResearchCollab</h2>
        <ul>
          <li><a href="#home" className="nav-item">Home</a></li>
          <li><a href="#about" className="nav-item">About</a></li>
          <li onClick={() => setLoginOpen(true)} className="nav-item">Login</li>
          <li onClick={() => setSignupOpen(true)} className="nav-item">Sign Up</li>
          <li>
            <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <motion.header
        id="home"
        className="hero"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>AI-Powered Research Collaboration</h1>
        <p>Discover, collaborate, and analyze research effortlessly with AI.</p>
        <motion.button className="explore-btn" whileHover={{ scale: 1.1 }}>
          Get Started
        </motion.button>
      </motion.header>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search research papers, datasets, experts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleResearchSearch}>🔍 Search Research</button>
        <button onClick={handleMatchmakingSearch}>🔍 Search Researchers</button>
      </div>

      {/* Research Results */}
      {researchResults.length > 0 && (
        <section>
          <h3>Research Paper Recommendations</h3>
          {researchResults.map((paper, index) => (
            <div key={index}>
              <h4>{paper.title}</h4>
              <p>{paper.cleaned_text}</p>
              <p>Similarity Score: {paper.similarity_score}</p>
            </div>
          ))}
        </section>
      )}

      {/* Matchmaking Results */}
      {matchResults.length > 0 && (
        <section>
          <h3>Researcher Matchmaking</h3>
          {matchResults.map((researcher, index) => (
            <div key={index}>
              <h4>{researcher.name}</h4>
              <p>{researcher.research_interests}</p>
              <p>Similarity Score: {researcher.similarity_score}</p>
            </div>
          ))}
        </section>
      )}

      {/* About Section */}
      <section id="about" style={{ padding: "50px 20px", background: darkMode ? "#333" : "#f5f7fa", color: darkMode ? "white" : "#333" }}>
        <h2>About ResearchCollab</h2>
        <p>ResearchCollab is a platform designed to help researchers collaborate and discover new opportunities.</p>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Researchers Say</h2>
        <p>“This platform transformed my research collaboration experience!”</p>
        <p>— Dr. Alex Johnson</p>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 ResearchCollab. All rights reserved.</p>
        <div className="social-icons">
          <a href="#">🔗 LinkedIn</a>
          <a href="#">📘 Facebook</a>
          <a href="#">🐦 Twitter</a>
        </div>
      </footer>

      {/* Login Popup */}
      {isLoginOpen && (
        <motion.div className="popup" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="popup-content">
            <h3>Login</h3>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
            <button onClick={() => setLoginOpen(false)}>Close</button>
          </div>
        </motion.div>
      )}

      {/* Signup Popup */}
      {isSignupOpen && (
        <motion.div className="popup" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="popup-content">
            <h3>Sign Up</h3>
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
            <button onClick={() => setSignupOpen(false)}>Close</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;