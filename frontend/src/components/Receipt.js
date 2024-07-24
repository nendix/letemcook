import React from "react";
import { Modal, Button } from "react-bootstrap";

const Receipt = ({ receiptData, closeModal }) => {
  return (
    <Modal show={true} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Dettagli Ordine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Codice Fiscale:</strong> {receiptData.taxCode}
        </p>
        <p>
          <strong>Primo:</strong> {receiptData.first}
        </p>
        <p>
          <strong>Secondo:</strong> {receiptData.second}
        </p>
        <p>
          <strong>Contorno:</strong> {receiptData.side}
        </p>
        <p>
          <strong>Ticket ID:</strong> {receiptData.ticket}
        </p>
        <h4>
          <b>Ritiro alle ore 13:00</b>
        </h4>
      </Modal.Body>
    </Modal>
  );
};

export default Receipt;
