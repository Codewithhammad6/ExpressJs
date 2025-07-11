import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert("Registration successful!");
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message;
      const validationErrors = err.response?.data?.errors;

      if (validationErrors && Array.isArray(validationErrors)) {
        setError(validationErrors[0].msg);
      } else if (msg) {
        setError(msg);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-20">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-[1.02]">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6 drop-shadow">Create Account</h2>

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
            <label className="block text-white mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
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
            className="w-full bg-white text-purple-700 font-bold py-2 rounded shadow-md hover:shadow-2xl transition"
          >
            Register
          </button>

          <div className="text-center mt-4 text-white">
            or
          </div>

          {/*  Google Login */}
          <div className="flex justify-center mt-2">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await axios.post('http://localhost:5000/api/auth/google-login', {
                    token: credentialResponse.credential
                  });

                  localStorage.setItem('token', res.data.token);
                  localStorage.setItem('username', res.data.username);
                  alert('Google registration successful!');
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
            Already have an account?{' '}
            <a href="/login" className="underline hover:text-yellow-300 transition">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
