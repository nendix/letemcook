import React, { useState, useEffect } from "react";
import { getMenuOfTheDay } from "../services/api";
import { Card, Spinner, Alert } from "react-bootstrap";

const MenuOfTheDay = () => {
  const [menuOfTheDay, setMenuOfTheDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuOfTheDay = async () => {
      try {
        const response = await getMenuOfTheDay();
        setMenuOfTheDay(response.data);
      } catch (err) {
        setError("Errore nel recupero del menu del giorno.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuOfTheDay();
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!menuOfTheDay) {
    return <p>Nessun menu del giorno disponibile.</p>;
  }

  // Funzione per formattare la data in dd-mm-yyyy
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <Card className="menu-card">
      {error ? (
        <Alert variant="danger" className="error-message">
          {error}
        </Alert>
      ) : (
        <>
          <Card.Header>{formatDate(menuOfTheDay?.date)}</Card.Header>
          <Card.Body>
            <Card.Title>Menu del giorno</Card.Title>
            <Card.Text>
              <strong>Primo:</strong> {menuOfTheDay?.first?.join(", ") || "N/A"}
            </Card.Text>
            <Card.Text>
              <strong>Secondo:</strong>{" "}
              {menuOfTheDay?.second?.join(", ") || "N/A"}
            </Card.Text>
            <Card.Text>
              <strong>Contorno:</strong>{" "}
              {menuOfTheDay?.side?.join(", ") || "N/A"}
            </Card.Text>
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default MenuOfTheDay;
