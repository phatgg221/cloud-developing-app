import { useState, useEffect } from 'react';

export default function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [webSocket, setWebSocket] = useState(null);
  const [data , setData]= useState(null);
  useEffect(() => {
    const ws = new WebSocket('wss://your-websocket-api-url'); // Replace with your WebSocket URL
    setWebSocket(ws);

    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      setMessages((prev) => [...prev, messageData]);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    return () => {
      ws.close();
    };
  }, []);
 const fetchUserInfo = async () => {
        try {
            const response = await fetch("/api/me");
            if (response.ok) {
                const data = await response.json();
                setUser(data.userInfo); 
                // console.log("User info fetched:", data.userInfo);
            } else {
                // console.error("User not authenticated");
                setData(null);
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };
  
  useEffect(() => {
          fetchUserInfo();
      }, []);
  
  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const message = {
      action: 'sendMessage',
      sender: 'Customer',
      message: inputMessage,
    };

    webSocket.send(JSON.stringify(message));
    setInputMessage('');
  };

  return (
    <div>
      {/* Chatbox Icon */}
      <div
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with us"
      >
        💬
      </div>

      {/* Chat Window */}
      {isOpen && data && (
        <div className="fixed bottom-16 right-4 w-80 bg-white shadow-lg rounded-lg">
          <div className="bg-blue-500 text-white p-3 rounded-t-lg">
            <h2 className="text-lg font-bold">Chat with Admin</h2>
            <button
              onClick={() => setIsOpen(false)}
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
                  <strong>{msg.sender}:</strong> {msg.message}
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
      {isOpen && !data && (
        <div className="fixed bottom-16 right-4 w-80 bg-white shadow-lg rounded-lg">
          <div className="bg-blue-500 text-white p-3 rounded-t-lg">
            <h2 className="text-lg font-bold">Chat with Admin</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white absolute top-2 right-2 font-bold"
            >
              ✕
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto space-y-2">
             Please login to chat with admin
          </div>
          
        </div>
      )}
    </div>
  );
}
