import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import OrderForm from "../components/OrderForm";
import MenuOfTheDay from "../components/MenuOfTheDay";
import "../App.css"; // import the CSS file

const HomePage = () => {
  return (
    <Container fluid className="homepage-container">
      <Row className="align-items-center header-row">
        <Col md={{ span: 5, offset: 1 }} className="header-title">
          <h1>
            MENSA <br />
            UNIVERSITÀ DEGLI STUDI DEL MOLISE
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
