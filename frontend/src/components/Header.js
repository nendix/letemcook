import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.roles.includes("admin"));
      } catch (e) {
        console.error("Error decoding token:", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav-left">
            <Button
              variant="outline-primary"
              as={Link}
              to="/"
              className="nav-button"
            >
              Home
            </Button>
            <Button
              variant="outline-primary"
              as={Link}
              to="/login"
              className="nav-button"
            >
              Login
            </Button>
            {isAdmin && (
              <Button
                variant="outline-primary"
                as={Link}
                to="/admin"
                className="nav-button"
              >
                Admin
              </Button>
            )}
          </Nav>
          <Navbar.Brand className="navbar-brand">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
            />
            <span className="ms-2">Mensa Universitaria</span>
          </Navbar.Brand>
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
