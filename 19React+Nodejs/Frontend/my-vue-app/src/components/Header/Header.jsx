import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username"); 
  const password = localStorage.getItem("password");

  // Load admin credentials from .env
  const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username"); 
    localStorage.removeItem("password"); 
    window.location.href = "/login";
  };

  return (
    <div className='bg-[#FFFFFF] border-b-4 fixed border-[#E1E1E1] w-[100vw] z-10'>
      <div className='flex py-3 justify-between items-center'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <div className="text-2xl pl-9 font-medium text-[#d83f24]">
            CONTACT APP
          </div>
        </Link>

        {token && (
          <div className='px-5 flex gap-2'>
            {/* ✅ Show Admin button only if username & password match */}
            {username === ADMIN_USERNAME && password === ADMIN_PASSWORD && location.pathname !== '/adminpage' && (
              <Link to='/adminpage'>
                <div className='hover:bg-blue-600 bg-blue-500 px-3 py-1 rounded text-white'>
                  Admin
                </div>
              </Link>
            )}

            <button
              onClick={handleLogout}
              className='hover:bg-red-600 bg-red-500 px-3 py-1 rounded text-white'
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
