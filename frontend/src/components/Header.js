import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // import the logo
import "../App.css"; // import the CSS file

const Header = () => {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Spostiamo i pulsanti a sinistra */}
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
            <Button
              variant="outline-primary"
              as={Link}
              to="/admin"
              className="nav-button"
            >
              Admin
            </Button>
          </Nav>
          {/* Centro il logo e la scritta */}
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
