import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MenuForm from "../components/MenuForm";
import MenuOfTheDay from "../components/MenuOfTheDay"; // Importa il nuovo componente

const HomePage = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <h1>Benvenuti nella Mensa Universitaria</h1>
          <p>Ordina il tuo pasto direttamente online.</p>
        </Col>
        <Col md={4}>
          <MenuForm />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <MenuOfTheDay /> {/* Aggiungi il componente MenuOfTheDay */}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
