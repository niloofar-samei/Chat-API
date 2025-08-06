import { useParams } from 'react-router-dom'

export default function ChatPage() {
  const { conversationId } = useParams()

  return (
    <div>
      <h1>Chat Room: {conversationId}</h1>
    </div>
  )
}

