import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";

const Header = ({
  toggleLogin,
  handleLogout,
  isAuthenticated,
  checkAuthentication,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAdminClick = () => {
    if (!checkAuthentication("admin", navigate)) {
      alert(
        "Non sei autorizzato ad accedere alla pagina Admin. Effettua il login.",
      );
    }
  };

  const handleChefClick = () => {
    if (!checkAuthentication("chef", navigate)) {
      alert(
        "Non sei autorizzato ad accedere alla pagina Chef. Effettua il login.",
      );
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
                  onClick={handleAdminClick} // Aggiungi la logica per Admin
                  className="nav-button"
                >
                  Admin
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={handleChefClick} // Aggiungi la logica per Chef
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
                onClick={toggleLogin} // Mostra il pop-up di login se necessario
                className="nav-button"
              >
                Login
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
