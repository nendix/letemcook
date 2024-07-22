import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import OrderForm from "../components/OrderForm";
import MenuOfTheDay from "../components/MenuOfTheDay";
import Login from "../components/Login";
import useLoginPopup from "../hooks/LoginHooks";
import "../App.css";

const HomePage = () => {
  const { showLogin, toggleLogin, handleLoginSuccess } = useLoginPopup();

  return (
    <Container fluid className="homepage-container">
      {showLogin && (
        <div className="login-overlay">
          <div className="login-popup">
            <button className="close-button" onClick={toggleLogin}>
              &times;
            </button>
            <Login onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
      <Row className="align-items-center header-row">
        <Col md={{ span: 5, offset: 1 }} className="header-title">
          <h1>
            MENSA <br />
            UNIVERSITÀ <br />
            DEGLI STUDI DEL MOLISE
          </h1>
          <div className="menu-of-the-day-container mt-3">
            <MenuOfTheDay />
          </div>
        </Col>
        <Col md={{ span: 5, offset: 1 }} className="form-column">
          <OrderForm />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
