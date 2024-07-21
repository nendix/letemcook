import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOrder, getMenuOfTheDay } from "../services/api";
import "../App.css"; // import the CSS file

const OrderForm = () => {
  const [date, setDate] = useState(new Date()); // Current date
  const [menu, setMenu] = useState(null);
  const [taxCode, setTaxCode] = useState("");
  const [selectedFirst, setSelectedFirst] = useState("");
  const [selectedSecond, setSelectedSecond] = useState("");
  const [selectedSide, setSelectedSide] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await getMenuOfTheDay();
        setMenu(response.data);
        setSelectedFirst("");
        setSelectedSecond("");
        setSelectedSide("");
      } catch (error) {
        toast.error("Errore nel recupero del menu. Riprova.");
        setMenu(null);
      }
    };

    fetchMenu();
  }, [date]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFirst || !selectedSecond || !selectedSide) {
      toast.warning("Tutti i campi devono essere selezionati.");
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
      toast.success("Ordine inviato con successo!");
      setTaxCode("");
      setSelectedFirst("");
      setSelectedSecond("");
      setSelectedSide("");
    } catch (error) {
      toast.error("Errore nell'invio dell'ordine. Riprova.");
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
    </Form>
  );
};

export default OrderForm;
