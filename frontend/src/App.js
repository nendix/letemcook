import { React } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import Login from "./components/Login";
import PrivateRoute from "./utils/PrivateRoute";
import ChefPage from "./pages/ChefPage";
import useLoginPopup from "./hooks/LoginHooks";

function App() {
  const {
    showLogin,
    toggleLogin,
    handleLoginSuccess,
    handleLogout,
    isAdmin,
    isChef,
  } = useLoginPopup();
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        toggleLogin={toggleLogin}
        handleLogout={handleLogout}
        isAdmin={isAdmin}
        isChef={isChef}
      />
      {showLogin && (
        <div className="login-overlay">
          <div className="login-popup">
            <button className="close-button" onClick={toggleLogin}>
              &times;
            </button>
            <Login onLoginSuccess={() => handleLoginSuccess(navigate)} />
          </div>
        </div>
      )}
      <div className="flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage showLogin={showLogin} toggleLogin={toggleLogin} />
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute roles={["admin"]}>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/chef"
            element={
              <PrivateRoute roles={["admin", "chef"]}>
                <ChefPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
