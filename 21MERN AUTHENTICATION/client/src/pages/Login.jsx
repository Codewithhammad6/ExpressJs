import React, { useState } from "react";
import useStore from "../store/userStore.js";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await login(formData);

  if (result.success) {
    navigate("/");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md text-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/20 text-white placeholder:text-white/60 rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. user@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/20 text-white placeholder:text-white/60 rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-md disabled:opacity-50"
        >
           {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Login"
                  )}
        
        </button>

        {/* Links */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <Link to="/register" className="text-blue-400 hover:underline">
            Don’t have an account? Register
          </Link>
          <Link to="/forgot-password" className="text-blue-400 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
