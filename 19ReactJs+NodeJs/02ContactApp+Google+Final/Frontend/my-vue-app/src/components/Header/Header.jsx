import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username"); 
  const password = localStorage.getItem("password");

  const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username"); 
    localStorage.removeItem("password"); 
    window.location.href = "/login";
  };

  return (
    <div className="fixed top-0 w-full z-50 bg-white/30 backdrop-blur-md border-b border-white/20 shadow-md">
      <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
        <Link to="/" className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
          CONTACT APP
        </Link>

        {token && (
          <div className="flex gap-3 items-center">
            {/* Admin Button */}
            {username === ADMIN_USERNAME && password === ADMIN_PASSWORD && location.pathname !== '/adminpage' && (
              <Link to="/adminpage">
                <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition shadow">
                  Admin
                </div>
              </Link>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded transition shadow"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
