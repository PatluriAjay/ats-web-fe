import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  // TODO: Replace with real authentication logic
  return !!localStorage.getItem("token");
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute; 