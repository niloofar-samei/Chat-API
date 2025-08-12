import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactLoginPage, { Logo, Username, Password, Submit, Footer } from '@react-login-page/page7';

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const API_REGISTER_URL = 'http://localhost:8000/api/register/';
    const API_LOGIN_URL = 'http://localhost:8000/api/login/';

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            await axios.post(API_REGISTER_URL, { username, password, email });

            const loginResponse = await axios.post(API_LOGIN_URL, { username, password });

            localStorage.setItem('accessToken', loginResponse.data.access)
            localStorage.setItem('refreshToken', loginResponse.data.refresh)
            navigate('/')

        } catch (err) {

            console.error(err.response?.data || err.message)
            alert('Register failed.')

        }
    }

  return (
      <div style={{
               width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
               alignItems: "center",
               backgroundColor: "#99e6ff",
           }}>

      <form onSubmit={handleRegister}>
          <h3 style={{ color: "white", textAlign: "center" }}>Register</h3>
          <input
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                  height: "40px",
                  width: "300px",
                  border: "1px solid white",
                  borderRadius: "5px",
                  backgroundColor: "#99e6ff",
                  marginBottom: "20px",
                  textAlign: "center",
                  color: "white"
              }}
          />
          <br />

          <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                  height: "40px",
                  width: "300px",
                  border: "1px solid white",
                  borderRadius: "5px",
                  backgroundColor: "#99e6ff",
                  marginBottom: "20px",
                  textAlign: "center",
                  color: "white"
              }}
          />
          <br />

          <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                  height: "40px",
                  width: "300px",
                  border: "1px solid white",
                  borderRadius: "5px",
                  backgroundColor: "#99e6ff",
                  marginBottom: "20px",
                  textAlign: "center",
                  color: "white"
              }}
          />
          <br />

        <button type="submit"
                style={{
                    height: "40px",
                    width: "308px",
                    border: "1px solid white",
                    borderRadius: "5px",
                    color: "#99e6ff",
                    backgroundColor: "white",
                }}>Register</button>

          <p style={{color: "white", textAlign: "center"}}>
              Are you a member? <a href='/login/' style={{ color: "white" }}>Login</a>
          </p>
      </form>

    </div>

  )
}
