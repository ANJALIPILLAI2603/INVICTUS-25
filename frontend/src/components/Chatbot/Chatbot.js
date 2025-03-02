import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to control chat visibility

  // Predefined questions and responses
  const predefinedQuestions = [
    "How do I search for research papers?",
    "Can I collaborate with other researchers?",
    "What is ResearchCollab?",
  ];

  const getBotResponse = (userInput) => {
    userInput = userInput.toLowerCase();
    if (userInput.includes("hello") || userInput.includes("hi")) {
      return "Hello! How can I assist you today?";
    } else if (userInput.includes("research")) {
      return "You can search for research papers using the search bar above.";
    } else if (userInput.includes("collaborate")) {
      return "Use the 'Search Researchers' feature to find collaborators.";
    } else if (userInput.includes("what is researchcollab")) {
      return "ResearchCollab is a platform designed to help researchers collaborate and discover new opportunities.";
    } else {
      return "I'm sorry, I didn't understand that. Can you please rephrase?";
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      setIsLoading(true);
      setMessages([...messages, { text: input, sender: "user" }]);

      // Simulate bot response
      setTimeout(() => {
        const botResponse = getBotResponse(input);
        setMessages([...messages, { text: input, sender: "user" }, { text: botResponse, sender: "bot" }]);
        setIsLoading(false);
        setInput("");
      }, 1000); // Simulate a 1-second delay
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen); // Toggle chat visibility
  };

  return (
    <>
      {/* Chatbot toggle button */}
      {!isChatOpen && (
        <button className="chatbot-toggle-btn" onClick={toggleChat}>
          Open Chat
        </button>
      )}

      {/* Chatbot interface */}
      {isChatOpen && (
        <div className="chatbot">
          <div className="chatbot-header">
            <h3>ResearchBot</h3>
            <button
              className="close-btn"
              onClick={toggleChat} // Toggle chat visibility when clicked
            >
              &times;
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="message bot typing">
                <span>•</span>
                <span>•</span>
                <span>•</span>
              </div>
            )}
          </div>
          <div className="predefined-questions">
            {predefinedQuestions.map((question, index) => (
              <button key={index} onClick={() => setInput(question)}>
                {question}
              </button>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;