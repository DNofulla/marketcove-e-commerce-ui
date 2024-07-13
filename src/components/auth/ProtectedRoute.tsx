import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";

interface ProtectedRouteProps {
  element: React.ReactElement;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, path }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <Route
      path={path}
      element={
        isAuthenticated ? (
          element
        ) : (
          <Navigate to="/login" state={{ from: location }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
