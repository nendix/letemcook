import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { createOrder, getMenuOfTheDay } from "../services/api";
import "../App.css"; // import the CSS file

const MenuForm = () => {
  const [date, setDate] = useState(new Date()); // Current date
  const [menu, setMenu] = useState(null);
  const [taxCode, setTaxCode] = useState("");
  const [selectedFirst, setSelectedFirst] = useState("");
  const [selectedSecond, setSelectedSecond] = useState("");
  const [selectedSide, setSelectedSide] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await getMenuOfTheDay();
        console.log("Menu fetched:", response.data); // Log the fetched menu
        setMenu(response.data);
        setSelectedFirst("");
        setSelectedSecond("");
        setSelectedSide("");
      } catch (error) {
        setMenu(null);
        setOrderStatus("Errore nel recupero del menu. Riprova.");
      }
    };

    fetchMenu();
  }, [date]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFirst || !selectedSecond || !selectedSide) {
      setOrderStatus("Tutti i campi devono essere selezionati.");
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
      setOrderStatus("Ordine inviato con successo!");
      setTaxCode("");
      setSelectedFirst("");
      setSelectedSecond("");
      setSelectedSide("");
    } catch (error) {
      setOrderStatus("Errore nell'invio dell'ordine. Riprova.");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form-container">
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
      {orderStatus && <p className="mt-3">{orderStatus}</p>}
    </Form>
  );
};

export default MenuForm;
