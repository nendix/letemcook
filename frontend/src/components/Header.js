import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";

const Header = ({ toggleLogin, handleLogout, isAdmin, isChef }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAdminClick = () => {
    if (isAdmin()) {
      navigate("/admin");
    }
  };

  const handleChefClick = () => {
    if (isAdmin() || isChef()) {
      navigate("/chef");
    }
  };

  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname === "/admin";
  const isChefPage = location.pathname === "/chef";

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav-left">
            {isHomePage && (
              <>
                <Button
                  variant="outline-primary"
                  onClick={handleAdminClick}
                  className="nav-button"
                >
                  Admin
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={handleChefClick}
                  className="nav-button"
                >
                  Chef
                </Button>
              </>
            )}
            {isAdminPage && (
              <>
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
                  to="/chef"
                  className="nav-button"
                >
                  Chef
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleLogout(navigate)}
                >
                  Logout
                </Button>
              </>
            )}

            {isChefPage && (
              <>
                <Button
                  variant="outline-primary"
                  as={Link}
                  to="/"
                  className="nav-button"
                >
                  Home
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleLogout(navigate)}
                >
                  Logout
                </Button>
              </>
            )}

            {!isHomePage && !isAdminPage && !isChefPage && (
              <Button
                variant="outline-primary"
                as={Link}
                to="/"
                className="nav-button"
              >
                Home
              </Button>
            )}
          </Nav>
          <Navbar.Brand className="navbar-brand">
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="Logo"
            />
            <span className="ms-2">Mensa Universitaria</span>
          </Navbar.Brand>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
