'use client';

import { useState } from 'react';

export default function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'Admin', text: 'Hi! How can I assist you today?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add customer message
    setMessages((prev) => [...prev, { sender: 'Customer', text: inputMessage }]);

    // Add admin response (mock)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'Admin', text: 'Thank you for reaching out! We will get back to you shortly.' },
      ]);
    }, 1000);

    // Clear input field
    setInputMessage('');
  };

  return (
    <div>
      {/* Chatbox Icon */}
      <div
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer"
        onClick={toggleChatbox}
        title="Chat with us"
      >
        💬
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 bg-white shadow-lg rounded-lg">
          <div className="bg-blue-500 text-white p-3 rounded-t-lg">
            <h2 className="text-lg font-bold">Chat with Admin</h2>
            <button
              onClick={toggleChatbox}
              className="text-white absolute top-2 right-2 font-bold"
            >
              ✕
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  msg.sender === 'Admin' ? 'bg-gray-100' : 'bg-blue-100'
                }`}
              >
                <p className="text-sm">
                  <strong>{msg.sender}:</strong> {msg.text}
                </p>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-200">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="mt-2 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
