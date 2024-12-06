// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password }, { withCredentials: true });
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('role', response.data.role);
      navigate('/admin');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
      <div className="container mx-auto p-4 mt-16">
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={handleLogin} className="mt-4">
          <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 mr-2"
          />
          <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
  );
};

export default Login;