import React from "react";
import { Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, roles }) => {
  const token = localStorage.getItem("token");
  let isAuthorized = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      isAuthorized = roles.some((role) => decodedToken.roles.includes(role));
    } catch (e) {
      console.error("Error decoding token:", e);
    }
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
