import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ConversationPage from './pages/ConversationPage'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'
import RegisterPage from './pages/RegisterPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConversationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat/:conversationId" element={<ChatPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}
