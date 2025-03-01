import React, { useState } from 'react';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        // Placeholder: Fetch AI-powered research results
        const sampleResults = [
            { title: 'AI in Research', link: 'https://arxiv.org/abs/1234.5678' },
            { title: 'Deep Learning for NLP', link: 'https://arxiv.org/abs/9876.5432' }
        ];
        setResults(sampleResults);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>AI-Driven Research Discovery</h2>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for research papers, datasets, experts..."
                style={{ width: '80%', padding: '10px', margin: '10px 0' }}
            />
            <button onClick={handleSearch} style={{ padding: '10px' }}>Search</button>
            
            <div>
                {results.map((item, index) => (
                    <div key={index}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;