import React, { useState } from "react";
import Message from "./Message";
import axios from "axios";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = async () => {
    if (inputValue.trim()) {
      setMessages([...messages, { sender: "user", text: inputValue }]);
      setInputValue("");

      try {
        // Send the message to the backend
        const response = await axios.post('http://localhost:5000/api/message', {
          message: inputValue,
        });

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: response.data.message }
        ]);
      } catch (error) {
        console.error('Error sending message to backend:', error);

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'Error: Unable to connect to the server.' }
        ]);
      }
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((message, index) => (
          <Message key={index} sender={message.sender} text={message.text} />
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
        onKeyUp={(e) => {
          if (e.key === 'Enter') sendMessage();
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
