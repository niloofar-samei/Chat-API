import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../api';

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const API_REGISTER_URL = 'http://localhost:8000/api/register/';

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(API_REGISTER_URL,
                                              { username, password, email,},
                                             );

            localStorage.setItem('accessToken', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            navigate('/')

        } catch (err) {

            console.error(err.response?.data || err.message)
            alert('Register failed.')

        }
    }

  return (
      <div style={{border:"1px solid red", padding:"20px"}}>
      <h2>Register</h2>

      <form onSubmit={handleRegister}>

          <label htmlFor="username">User Name</label><br />
          <input
              type="text"
              placeholder="Your username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />
          <br />

          <label htmlFor="pw">Password</label><br />
          <input
              type="password"
              placeholder="Your password"
              id="pw"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <label htmlFor="email">Email</label><br />
          <input
              type="email"
              placeholder="Your email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <br />

        <button type="submit">Register</button>

      </form>

    </div>
  )
}
