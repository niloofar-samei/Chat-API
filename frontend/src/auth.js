import axios from 'axios';

export async function refreshToken() {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh) {
    alert('No refresh token, please log in again');
    return null;
  }
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh });
    localStorage.setItem('accessToken', res.data.access);
    alert('Token refreshed!');
    return res.data.access;
  } catch {
    alert('Refresh failed, please log in again');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return null;
  }
}
