import React from "react";
import { Navigate } from "react-router";

function ProtectedRoute({ children, allowed }) {
  const user = JSON.parse(localStorage.getItem("userlogin"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowed && !allowed.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
