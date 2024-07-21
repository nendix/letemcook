import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MenuForm from "../components/MenuForm";
import MenuOfTheDay from "../components/MenuOfTheDay";
import "../App.css"; // import the CSS file

const HomePage = () => {
  const [showMenuOfTheDay, setShowMenuOfTheDay] = useState(false);

  const toggleMenuOfTheDay = () => {
    setShowMenuOfTheDay(!showMenuOfTheDay);
  };

  return (
    <Container fluid className="homepage-container">
      <Row className="align-items-center header-row">
        <Col md={{ span: 5, offset: 1 }} className="header-title">
          <h1>
            MENSA <br />
            UNIVERSITÀ DEGLI STUDI DEL MOLISE
          </h1>
          <Button
            variant="primary"
            onClick={toggleMenuOfTheDay}
            className="mt-3"
          >
            {showMenuOfTheDay
              ? "Nascondi Menu del Giorno"
              : "Mostra Menu del Giorno"}
          </Button>
          {showMenuOfTheDay && (
            <div className="menu-of-the-day-container mt-3">
              <MenuOfTheDay />
            </div>
          )}
        </Col>
        <Col md={{ span: 5, offset: 1 }} className="form-column">
          <MenuForm />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
