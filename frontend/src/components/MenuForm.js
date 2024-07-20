import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMenuByDate, createOrder } from "../services/api";

const MenuForm = () => {
  const [date, setDate] = useState(new Date());
  const [menu, setMenu] = useState(null);
  const [taxCode, setTaxCode] = useState("");
  const [selectedFirst, setSelectedFirst] = useState("");
  const [selectedSecond, setSelectedSecond] = useState("");
  const [selectedSide, setSelectedSide] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await getMenuByDate(date.toISOString().split("T")[0]);
        setMenu(response.data);
        setSelectedFirst("");
        setSelectedSecond("");
        setSelectedSide("");
      } catch (error) {
        setMenu(null); // Clear menu if not found
      }
    };

    fetchMenu();
  }, [date]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderData = {
      taxCode,
      date: date.toISOString().split("T")[0],
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
    <Form onSubmit={handleSubmit}>
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
      <Form.Group controlId="date">
        <Form.Label>Data</Form.Label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="yyyy-MM-dd"
          className="form-control"
        />
      </Form.Group>
      <Form.Group controlId="first">
        <Form.Label>Primo</Form.Label>
        <Form.Control
          as="select"
          value={selectedFirst}
          onChange={(e) => setSelectedFirst(e.target.value)}
        >
          <option value="">Seleziona un primo</option>
          {menu?.first?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="second">
        <Form.Label>Secondo</Form.Label>
        <Form.Control
          as="select"
          value={selectedSecond}
          onChange={(e) => setSelectedSecond(e.target.value)}
        >
          <option value="">Seleziona un secondo</option>
          {menu?.second?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="side">
        <Form.Label>Contorno</Form.Label>
        <Form.Control
          as="select"
          value={selectedSide}
          onChange={(e) => setSelectedSide(e.target.value)}
        >
          <option value="">Seleziona un contorno</option>
          {menu?.side?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Ordina
      </Button>
      {orderStatus && <p className="mt-3">{orderStatus}</p>}
    </Form>
  );
};

export default MenuForm;
