
import React, { useState } from 'react';
import API from '../api.js';

const Auth = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Attempting login with:', { email: form.email, password: form.password });
    try {
      const response = await API.post('/auth/login', { email: form.email, password: form.password });
      console.log('Login successful:', response.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Login failed:', err);
      if (err.response) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert('Network error. Check if backend is running on port 5000.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isLogin && <input type="text" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />}
      <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      <button type="button" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Switch to Register' : 'Switch to Login'}</button>
    </form>
  );
};

export default Auth;