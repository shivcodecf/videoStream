import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {

  const navigate = useNavigate();  
  const isAuth = localStorage.getItem("isAuth");

  return isAuth ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
