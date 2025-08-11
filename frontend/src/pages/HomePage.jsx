import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function ConversationsPage() {
  const [conversations, setConversations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newConversation, setNewConversation] = useState("");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("Token:", token); // ✅ debug

        if (token) {
        // Use the access token
            console.log('Access Token:', token);
        } else {
            console.log('Access Token not found in local storage.');
        }

        const response = await axios.get("http://127.0.0.1:8000/api/conversations/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response data:", response.data); // ✅ debug
        setConversations(response.data);
      } catch (err) {
        console.error("Error fetching:", err);
        setError("Failed to load conversations.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  const handleSend = async () => {

    if (!newConversation.trim()) return;

    try {
      const res = await axios.post(
          "http://127.0.0.1:8000/api/conversations/",
          { name: newConversation, participants: [4,5] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setConversations((prev) => [...prev, res.data]);
      setNewConversation("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };


  // 🧠 Debug outputs to console
  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Conversations:", conversations);
    console.log("==================");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!conversations || conversations.length === 0) {
    return <p>No conversations found.</p>;
  }

  return (
    <div>
      <h1>Your Conversations</h1>
      <ul>
        {conversations.map((conv) => (
            <li key={conv.id}>
                <Link to={`/chat/${conv.id}`}>{conv.name}</Link>
            </li>
        ))}
      </ul>

        <input
        type="text"
        value={newConversation}
        onChange={(e) => setNewConversation(e.target.value)}
        placeholder="Conversation name..."
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        style={{ width: "80%", marginRight: "10px" }}
      />
      <button onClick={handleSend}>Send</button>

    </div>
  );
}
