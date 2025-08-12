import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { refreshToken } from '../auth';
const ChatPage = () => {
    const { conversationId } = useParams();
    console.log(conversationId)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const token = localStorage.getItem("accessToken");
    const API_MESSAGES_URL = `http://localhost:8000/api/conversations/${conversationId}/messages/`;

  useEffect(() => {
    if (!token) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(API_MESSAGES_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
          if (err.response?.status === 401) {
              token = await refreshToken();
              if (token) {
                  const res = await axios.get(API_MESSAGE_URL, {
                      headers: { Authorization: `Bearer $(token)` }
                  });
                  setMessages(res.data);
              }
          } else {
              alert('Failed to fetch messages');
          }
      }
    };

    fetchMessages();
  }, [token]);

  const handleSend = async () => {

    if (!newMessage.trim()) return;

    try {
      const res = await axios.post(
        API_MESSAGES_URL,
        { text: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "scroll",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} style={{ marginBottom: "8px" }}>
              <strong>{msg.sender || "Anonymous"}:</strong> {msg.text}
            </div>
          ))
        )}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        style={{ width: "80%", marginRight: "10px" }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatPage;
