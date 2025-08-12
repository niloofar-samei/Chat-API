import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const API_LOGIN_URL = 'http://127.0.0.1:8000/api/login/';

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post(API_LOGIN_URL, { username, password });

            localStorage.setItem('accessToken', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            navigate('/')

        } catch (err) {

            console.error(err.response?.data || err.message)
            alert('Login failed. Check your username and password.')

        }
    }

  return (
      <div style={{border:"1px solid red", padding:"20px"}}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>

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

        <button type="submit">Login</button>

      </form>

    </div>
  )
}
