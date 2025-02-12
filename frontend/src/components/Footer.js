import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../App.css"; // import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} className="text-center text-md-left">
            <h5>Contatti</h5>
            <p>Email: web@unimol.it</p>
            <p>Telefono: 0874 404100</p>
          </Col>
          <Col md={4} className="text-center">
            <h5>Seguici</h5>
            <a
              href="https://www.instagram.com/unimolise"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>{" "}
            |
            <a
              href="https://t.me/barunimolpesche"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Telegram
            </a>
          </Col>
          <Col md={4} className="text-center text-md-right">
            <h5>Informazioni</h5>
            <p>
              <a href="/privacy">Privacy Policy</a>
            </p>
            <p>
              <a href="/terms">Termini e Condizioni</a>
            </p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>Creato da Christian La Bella e Daniele Merola</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
