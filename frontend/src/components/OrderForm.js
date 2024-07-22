import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { createOrder, getMenuOfTheDay } from "../services/api";
import "../App.css"; // import the CSS file

const OrderForm = () => {
  const [date, setDate] = useState(new Date()); // Current date
  const [menu, setMenu] = useState(null);
  const [taxCode, setTaxCode] = useState("");
  const [selectedFirst, setSelectedFirst] = useState("");
  const [selectedSecond, setSelectedSecond] = useState("");
  const [selectedSide, setSelectedSide] = useState("");
  const [message, setMessage] = useState(""); // State for messages
  const [messageType, setMessageType] = useState(""); // State for message type (success or error)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await getMenuOfTheDay();
        setMenu(response.data);
        setSelectedFirst("");
        setSelectedSecond("");
        setSelectedSide("");
        setMessage(""); // Clear any previous messages
      } catch (error) {
        setMessage("Errore nel recupero del menu. Riprova.");
        setMessageType("error");
        setMenu(null);
      }
    };

    fetchMenu();
  }, [date]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFirst || !selectedSecond || !selectedSide) {
      setMessage("Tutti i campi devono essere selezionati.");
      setMessageType("warning");
      return;
    }

    const orderData = {
      taxCode,
      date: date.toISOString().split("T")[0], // Use current date
      first: selectedFirst,
      second: selectedSecond,
      side: selectedSide,
    };

    try {
      await createOrder(orderData);
      setMessage("Ordine inviato con successo!");
      setMessageType("success");
      setTaxCode("");
      setSelectedFirst("");
      setSelectedSecond("");
      setSelectedSide("");
    } catch (error) {
      setMessage("Errore nell'invio dell'ordine. Riprova.");
      setMessageType("error");
    }
  };

  return (
    <div className="order-form-container">
      <Form onSubmit={handleSubmit} className="form-container">
        {message && (
          <div
            className={`alert ${
              messageType === "success"
                ? "alert-success"
                : messageType === "error"
                ? "alert-danger"
                : "alert-warning"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
        <Form.Group controlId="taxCode">
          <Form.Label>Codice Fiscale</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il codice fiscale"
            value={taxCode}
            onChange={(e) => setTaxCode(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="first">
          <Form.Label>Primo</Form.Label>
          <Form.Control
            as="select"
            value={selectedFirst}
            onChange={(e) => setSelectedFirst(e.target.value)}
            required
          >
            <option value="">Seleziona un primo</option>
            {menu?.first?.length ? (
              menu.first.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))
            ) : (
              <option value="">Nessuna opzione disponibile</option>
            )}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="second">
          <Form.Label>Secondo</Form.Label>
          <Form.Control
            as="select"
            value={selectedSecond}
            onChange={(e) => setSelectedSecond(e.target.value)}
            required
          >
            <option value="">Seleziona un secondo</option>
            {menu?.second?.length ? (
              menu.second.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))
            ) : (
              <option value="">Nessuna opzione disponibile</option>
            )}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="side">
          <Form.Label>Contorno</Form.Label>
          <Form.Control
            as="select"
            value={selectedSide}
            onChange={(e) => setSelectedSide(e.target.value)}
            required
          >
            <option value="">Seleziona un contorno</option>
            {menu?.side?.length ? (
              menu.side.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))
            ) : (
              <option value="">Nessuna opzione disponibile</option>
            )}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-button">
          Ordina
        </Button>
      </Form>
    </div>
  );
};

export default OrderForm;
