import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import About from './pages/About';
import OTPVerification from './pages/OTPVerification';
import useStore from './store/userStore';
import Navbar from "./components/navBar";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const { getUser, isAuth, loaded } = useStore();

  useEffect(() => {
    getUser(); // Fetch user on app load
  },[getUser]);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" />} />
        <Route path="/about" element={isAuth ? <About /> : <Navigate to="/login" />} />

        <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuth ? <Register /> : <Navigate to="/" />} />
        <Route path="/forgot-password" element={!isAuth ?<ForgotPassword />: <Navigate to="/" />} />
        <Route
          path="/password/reset/:token"
          element={!isAuth ? <ResetPassword /> : <Navigate to="/" />}
        />
        <Route
          path="/otp-verification/:email/:phone"
          element={!isAuth ? <OTPVerification /> : <Navigate to="/" />}
        />

        <Route path="*" element={<Navigate to={isAuth ? "/" : "/login"} />} />
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
