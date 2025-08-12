import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactLoginPage, { Logo, Username, Password, Submit, Footer } from '@react-login-page/page7';
import LoginLogo from 'react-login-page/logo-rect';

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const API_LOGIN_URL = 'http://127.0.0.1:8000/api/login/';

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(API_LOGIN_URL, { username, password });

            localStorage.setItem('accessToken', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            navigate('/')

        } catch (err) {

            console.error(err.response?.data || err.message)
            alert('Login failed. Check your username and password.')

        }
    }

    return (

        <ReactLoginPage
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>

            <Logo><LoginLogo/></Logo>
            <Username name="userUserName" onChange={(e) => setUsername(e.target.value)}/>
            <Password name="userPassword" onChange={(e) => setPassword(e.target.value)}/>
            <Submit onClick={handleLogin}>Submit</Submit>

            <Footer>Not a member? <a href='/register/'>Register</a> </Footer>
        </ReactLoginPage>

    )
}
