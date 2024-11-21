import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('http://localhost:8080/api/chat', { message: input });
      const assistantMessage = { role: 'assistant', content: JSON.parse(response.data).choices[0].message.content };
      setMessages([...messages, userMessage, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([...messages, userMessage, { role: 'assistant', content: 'Error communicating with server.' }]);
    }

    setInput('');
  };

  return (
    <div className="App">
      <h1>ChatGPT UI</h1>
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
