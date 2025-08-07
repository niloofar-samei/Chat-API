import { useEffect, useState } from "react";
import axios from "axios";

export default function ConversationsPage() {
  const [conversations, setConversations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("Token:", token); // ✅ debug

        if (accessToken) {
        // Use the access token
            console.log('Access Token:', accessToken);
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
  }, []);

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
          <li key={conv.id}>{conv.name}</li>
        ))}
      </ul>
    </div>
  );
}
