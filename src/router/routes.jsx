// import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
/* React-toastify for notification */
import "react-toastify/dist/ReactToastify.css";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Budget from "../pages/Budget";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Navbar from "../components/Navbar";

const routes = () => {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/** Wrap all Route under protected-routes element */}
        <Route element={<ProtectedRoute />}>
          <Route path="/budget" element={<Budget />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default routes;
