import React, { useState } from 'react';
import './SummarizationPage.css';

const SummarizationPage = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    const trimmedText = text.trim();
    
    if (!trimmedText) {
      setError('Please enter some text.');
      return;
    }

    setLoading(true);
    setError('');
    setSummary('');

    try {
      const response = await fetch('http://127.0.0.1:5000/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmedText }),
      });

      const data = await response.json();

      if (response.ok && data.summary) {
        setSummary(typeof data.summary === 'object' ? data.summary.summary : data.summary);
      } else {
        setError(data.error || 'Failed to summarize text.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="summarization-page">
      <h2>Summarize Your Research</h2>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your research text here..."
      />
      
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {error && <p className="error">{error}</p>}
      
      {summary && (
        <div className="summary-container">
          <h3>Summary:</h3>
          <p className="summary-text">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummarizationPage;
