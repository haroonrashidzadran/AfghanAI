import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([{
    text: "Hello! I'm your AI assistant. How can I help you today?",
    sender: 'bot'
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      // Using a working mock AI that responds intelligently
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      const lowerInput = currentInput.toLowerCase();
      let botResponse = "I understand what you're asking. Let me help you with that.";
      
      if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        botResponse = "Hello! I'm your AI assistant. How can I help you today?";
      } else if (lowerInput.includes('how are you')) {
        botResponse = "I'm doing great, thank you for asking! I'm here to help you with any questions or tasks you have.";
      } else if (lowerInput.includes('what') && lowerInput.includes('name')) {
        botResponse = "I'm your AI Assistant, built to help you with various tasks and answer your questions.";
      } else if (lowerInput.includes('help')) {
        botResponse = "I'm here to help! I can assist you with questions, provide information, help with tasks, or just have a conversation. What would you like to know?";
      } else if (lowerInput.includes('thank')) {
        botResponse = "You're very welcome! I'm happy to help. Is there anything else you'd like to know?";
      } else if (lowerInput.includes('weather')) {
        botResponse = "I don't have access to real-time weather data, but I'd recommend checking a weather app or website for current conditions in your area.";
      } else if (lowerInput.includes('time')) {
        botResponse = `The current time is ${new Date().toLocaleTimeString()}. Is there anything else I can help you with?`;
      } else {
        const responses = [
          "That's an interesting question! Based on what you're asking, I'd suggest looking into that topic further. What specific aspect would you like to explore?",
          "I understand what you're getting at. Could you provide a bit more context so I can give you a more helpful response?",
          "That's a great point you're making. From my perspective, there are several ways to approach this. What's your main goal here?",
          "I see what you mean. This is definitely something worth discussing. What's the most important aspect for you?",
          "Thanks for bringing that up! It's an interesting topic. What would you like to know more about specifically?"
        ];
        botResponse = responses[Math.floor(Math.random() * responses.length)];
      }
      
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: 'I\'m here to help! What would you like to know?', sender: 'bot' }]);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <div className="chat-container">
        <div className="chat-header">
          <div className="header-content">
            <div className="ai-avatar">🤖</div>
            <div className="header-text">
              <h1>AI Assistant</h1>
              <span className="status">Online</span>
            </div>
          </div>
        </div>
        
        <div className="messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-wrapper ${msg.sender}`}>
              <div className={`message ${msg.sender}`}>
                <div className="message-content">{msg.text}</div>
                <div className="message-time">
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="message-wrapper bot">
              <div className="message bot typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="input-area">
          <div className="input-wrapper">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loading && sendMessage()}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button 
              onClick={sendMessage} 
              disabled={loading || !input.trim()}
              className="send-button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;