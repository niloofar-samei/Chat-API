import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import api from '../api';

export default function ConversationsPage() {
    const [conversations, setConversations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newConversation, setNewConversation] = useState("");
    const API_CONVERSATIONS_URL = `http://localhost:8000/api/conversations/`;

    useEffect(() => {
        async function fetchData() {
            try {

                const response = await api.get(API_CONVERSATIONS_URL);
                setConversations(response.data);

            } catch (err) {

                setError("Failed to load conversations.");

            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleSend = async () => {
        if (!newConversation.trim()) return;

        try {

            const res = await api.post(API_CONVERSATIONS_URL, { name: newConversation, participants: [4,5] });
            setConversations((prev) => [...prev, res.data]);
            setNewConversation("");

        } catch (err) {
            console.error("Failed to send message:", err);
        }
    };

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
