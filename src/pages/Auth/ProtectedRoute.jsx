import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;
