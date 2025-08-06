import { useParams } from 'react-router-dom'

export default function ChatPage() {
  const { conversationId } = useParams()
  return <h1>Chat for Conversation ID: {conversationId}</h1>
}

