import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatApp.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages'));
    if (storedMessages) {
      setMessages(storedMessages);
    } else {
      // If no previous messages, start with a bot message
      const val = "Welcome to the chatbot! How can I assist you?"
      const welcomeMessage = { text: val.replace(/\n/g, '<br/>'), sender: 'bot1', name: "Bot" };
      setMessages([welcomeMessage]);
      localStorage.setItem('messages', JSON.stringify([welcomeMessage]));
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { text: inputMessage, sender: 'user', name: "You" };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('/api/send-message', { message: inputMessage });
      const botResponse = {
        text: response.data.replace(/\n/g, '<br/>'), // Replace newline characters with HTML line breaks
        sender: 'bot1',
        name: "Bot"
      };
      setMessages([...messages, botResponse]);
      localStorage.setItem('messages', JSON.stringify([...messages, userMessage, botResponse]));
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`} >
            <div className="message-bubble" dangerouslySetInnerHTML={{ __html: `${message.name}: ${message.text}` }}></div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <div className="chat-input-container">
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress} // Call handleKeyPress when Enter key is pressed
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
