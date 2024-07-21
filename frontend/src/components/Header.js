import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // import the logo
import "./style.css"; // import the CSS file

import "../App.css"; // import the CSS file
const Header = () => {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand className="mx-auto d-flex align-items-center navbar-center">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          />
          <span className="ms-2">Mensa Universitaria</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Button
              variant="outline-primary"
              as={Link}
              to="/login"
              className="login-button"
            >
              Login
            </Button>
            <Button
              variant="outline-primary"
              as={Link}
              to="/admin"
              className="admin"
            >
              Admin
            </Button>
            <Button
              variant="outline-primary"
              as={Link}
              to="/"
              className="admin"
            >
              Home
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
