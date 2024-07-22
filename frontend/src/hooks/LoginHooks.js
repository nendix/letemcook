import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const useLoginPopup = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleLogin = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  const handleLoginSuccess = (navigate) => {
    setShowLogin(false);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const role = decodedToken.roles[0];
        setIsAuthenticated(true);
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "chef") {
          navigate("/chef");
        } else {
          navigate("/");
        }
      } catch (e) {
        console.error("Error decoding token:", e);
      }
    }
  };

  const handleLogout = (navigate) => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setShowLogin(false);
    navigate("/");
  };

  const checkAuthentication = (requiredRole, navigate) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userRoles = decodedToken.roles;
        if (userRoles.includes("admin") || userRoles.includes(requiredRole)) {
          navigate(`/${requiredRole}`);
          return true;
        }
      } catch (e) {
        console.error("Error decoding token:", e);
      }
    }
    setShowLogin(true);
    return false;
  };

  return {
    showLogin,
    toggleLogin,
    handleLoginSuccess,
    handleLogout,
    isAuthenticated,
    checkAuthentication,
  };
};

export default useLoginPopup;
