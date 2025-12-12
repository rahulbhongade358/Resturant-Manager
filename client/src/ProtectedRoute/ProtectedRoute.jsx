import React from "react";
import { Navigate } from "react-router";

function ProtectedRoute({ children, allowed }) {
  const user = JSON.parse(localStorage.getItem("userlogin"));

  if (!user) return <Navigate to="/login" />;

  if (!allowed.includes(user.role)) return <Navigate to="/" />;

  return children;
}

export default ProtectedRoute;
