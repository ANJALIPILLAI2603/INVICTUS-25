import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import SummarizationPage from './pages/SummarizationPage'; // Ensure this path is correct

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(""); // 'login' or 'signup'

  // Effect to update the class for dark mode after state change
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  const openPopup = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">AI Research Platform</div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="#about">About</Link></li>
            <li><Link to="#contact">Contact</Link></li>
            {/* Login & Sign Up Links styled like navigation links */}
            <li>
              <Link to="#" onClick={() => openPopup('login')}>Login</Link>
            </li>
            <li>
              <Link to="#" onClick={() => openPopup('signup')}>Sign Up</Link>
            </li>
            {/* Toggle Dark Mode Button */}
            <li>
              <button 
                onClick={toggleDarkMode} 
                className="toggle-btn" 
                aria-label="Toggle Dark Mode"
              >
                Toggle 
              </button>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={
            <>
              {/* Hero Section */}
              <section className="hero">
                <h1>Welcome to AI Research Platform</h1>
                <p>Empowering your research journey with AI-powered tools</p>
              </section>

              {/* Search Bar */}
              <div className="search-container">
                <input type="text" placeholder="Search Research Papers..." />
                <button>Search</button>
              </div>

              {/* Features Section */}
              <section className="feature-grid">
                <div className="feature-card">
                  <h3>AI-powered Research</h3>
                  <p>Discover more about AI-powered Research to enhance your research process.</p>
                  <button className="learn-more-btn">Learn More</button>
                </div>
                <div className="feature-card">
                  <h3>NLP Summarization</h3>
                  <p>Enhance your research process with automatic NLP summarization tools.</p>
                  <Link to="/summarization">
                    <button className="learn-more-btn">Learn More</button>
                  </Link>
                </div>
                <div className="feature-card">
                  <h3>Data Science Insights</h3>
                  <p>Discover the latest data science insights for a better understanding of your research.</p>
                  <button className="learn-more-btn">Learn More</button>
                </div>
              </section>
            </>
          } />
          
          {/* Summarization Page Route */}
          <Route path="/summarization" element={<SummarizationPage />} />
        </Routes>

        {/* Footer */}
        <footer>
          <p>© 2025 AI Research Platform. All Rights Reserved.</p>
          <div className="social-icons">
            <a href="#twitter">Twitter</a>
            <a href="#linkedin">LinkedIn</a>
            <a href="#github">GitHub</a>
          </div>
        </footer>

        {/* Popups for Login & Signup */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <span className="close-btn" onClick={closePopup}>×</span>
              <h3>{popupType === 'login' ? 'Login' : 'Sign Up'}</h3>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>{popupType === 'login' ? 'Login' : 'Sign Up'}</button>
              <p>{popupType === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <span onClick={() => openPopup(popupType === 'login' ? 'signup' : 'login')}>Click here</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
