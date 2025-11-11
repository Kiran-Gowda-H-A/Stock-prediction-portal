import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const token = localStorage.getItem("accessToken");

  if (!isLoggedIn || !token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
