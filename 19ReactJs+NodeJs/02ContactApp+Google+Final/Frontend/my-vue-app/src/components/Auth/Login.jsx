import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem("username", formData.username); 
      localStorage.setItem("password", formData.password); 
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-[1.02]">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6 drop-shadow">Welcome Back</h2>

        {error && <p className="text-red-200 text-center mb-4 font-medium">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white mb-1 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-white/80 border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner"
            />
          </div>

          <div>
            <label className="block text-white mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-white/80 border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-purple-700 font-bold py-2 rounded hover:bg-purple-100 shadow-md hover:shadow-2xl transition"
          >
            Login
          </button>

          <div className="text-center text-white mt-4">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await axios.post('http://localhost:5000/api/auth/google-login', {
                    token: credentialResponse.credential
                  });
                  localStorage.setItem('token', res.data.token);
                  localStorage.setItem('username', res.data.username);
                  alert('Google Login successful!');
                  navigate('/');
                } catch (err) {
                  console.error('Google login error:', err);
                  setError('Google login failed');
                }
              }}
              onError={() => {
                setError('Google login failed');
              }}
            />
          </div>

          <p className="text-white text-center mt-4">
            Don't have an account?{' '}
            <a href="/register" className="underline hover:text-yellow-300 transition">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
