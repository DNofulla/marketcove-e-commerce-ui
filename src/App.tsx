import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/auth/context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Signup from "./components/auth/signup/Signup";
import Login from "./components/auth/login/Login";
import ForgotPassword from "./components/auth/forgot-password/ForgotPassword";
import ResetPassword from "./components/auth/reset-password/ResetPassword";
import AuthSuccess from "./components/auth/success/AuthSuccess";
import Home from "./components/home/Home";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth-success"
            element={
              <ProtectedRoute>
                <AuthSuccess />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
