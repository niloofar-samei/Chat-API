import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function ConversationsPage() {
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("accessToken");

        if (token) {
            console.log('Access Token:', token);
        } else {
            console.log('Access Token not found in local storage.');
        }

        const response = await axios.get("http://127.0.0.1:8000/api/conversations/1/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response data:", response.data);
        setMessages(response.data);

      } catch (err) {

        console.error("Error fetching:", err);
        setError("Failed to load messages.");

      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Messages:", messages);
  console.log("==================");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!messages || messages.length === 0) {
    return <p>No messages found.</p>;
  }

  return (
    <div>
      <h1>Your Messages</h1>
      <ul>
        {messages.map((mes) => (
            <li key={mes.id}>{mes.text} - <Link to={`/chat/${mes.id}`}>{mes.text}</Link></li>
        ))}
      </ul>
    </div>
  );
}
