import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../api';

const ChatPage = () => {
    const { conversationId } = useParams();
    console.log(conversationId)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const API_MESSAGES_URL = `/conversations/${conversationId}/messages/`;

    useEffect(() => {
        const fetchMessages = async () => {
            try {

                const res = await api.get(API_MESSAGES_URL);
                setMessages(res.data);

            } catch (err) {

                console.error("Failed to fetch messages:", err);

            }
        };

        fetchMessages();
    }, []);

    const handleSend = async () => {
        if (!newMessage.trim()) return;

        try {

            const res = await api.post(API_MESSAGES_URL, { text: newMessage });
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
              backgroundColor: " #e6e6ff"
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
