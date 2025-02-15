import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const accessToken = localStorage.getItem("access");

    if (!accessToken || !storedUsername) {
      navigate("/login");
      return;
    }

    setUsername(storedUsername);
    connectWebSocket();
  }, [navigate]);

  const connectWebSocket = () => {
    socketRef.current = new WebSocket("ws://127.0.0.1:8000/ws/chat/");

    socketRef.current.onopen = () => console.log("WebSocket Connected");
    
    socketRef.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      
      setMessages((prev) => {
        if (!prev.some(msg => msg.sender === newMessage.sender && msg.message === newMessage.message && msg.timestamp === newMessage.timestamp)) {
          return [...prev, newMessage];
        }
        return prev;
      });
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected, retrying...");
      setTimeout(connectWebSocket, 3000);
    };
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const msgData = {
        sender: username,
        message,
        timestamp: format(new Date(), "hh:mm a"),
      };
      socketRef.current.send(JSON.stringify(msgData));
      setMessage("");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>Welcome, {username}!</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender === username ? "self" : "other"}`}>
            <p className="sender">{msg.sender !== username && msg.sender}</p>
            <div className="message-content">{msg.message}</div>
            <span className="timestamp">{msg.timestamp}</span>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Home;
