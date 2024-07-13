import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
// import Dashboard from "./components/dashboard/Dashboard";
import Signup from "./components/auth/signup/Signup";
import Home from "./components/home/Home";
import Login from "./components/auth/login/Login";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <ProtectedRoute path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
