import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  if (
    token &&
    username === ADMIN_USERNAME &&
    password === ADMIN_PASSWORD
  ) {
    return children;
  }

  return <Navigate to="/" replace />;
}

export default AdminRoute;
