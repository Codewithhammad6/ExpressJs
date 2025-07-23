import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Contact, LogOut } from 'lucide-react';
import useAuthStore from '../store/userStore.js';

function Navbar() {
  const { logout, isAuth } = useAuthStore();
  const navigate = useNavigate();

const handleLogout = async () => {
  await logout();
  navigate("/login", { replace: true }); // force redirect to login
};



  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40
      backdrop-blur-lg"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">

          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Car className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Hammad</h1>
            </Link>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-5">
           {isAuth && (
              <a href='/about'
                className="flex gap-2 items-center hover:text-blue-500 transition"
                
              >
                <Contact className="size-5" />
                <span className="hidden sm:inline">About</span>
              </a>
            )}
            {isAuth && (
              <button
                className="flex gap-2 items-center hover:text-red-600 transition"
                onClick={handleLogout}
              >
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            
          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
