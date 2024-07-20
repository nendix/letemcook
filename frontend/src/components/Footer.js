import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="mt-auto py-3 bg-light">
      <Container>
        <Row>
          <Col className="text-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>{" "}
            |
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Telegram
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
