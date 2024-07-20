import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";
import {
  getMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  deleteOldMenus,
  deleteOldOrders,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../services/api";

const AdminPage = () => {
  const [menus, setMenus] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null); // "menu" o "order"

  useEffect(() => {
    loadMenus();
    loadOrders();
  }, []);

  const loadMenus = () => {
    getMenus().then((response) => setMenus(response.data));
  };

  const loadOrders = () => {
    getOrders().then((response) => setOrders(response.data));
  };

  const handleShowMenuModal = (menu = null) => {
    setCurrentMenu(menu);
    setShowMenuModal(true);
  };

  const handleCloseMenuModal = () => {
    setShowMenuModal(false);
    setCurrentMenu(null);
  };

  const handleShowOrderModal = (order = null) => {
    setCurrentOrder(order);
    setShowOrderModal(true);
  };

  const handleCloseOrderModal = () => {
    setShowOrderModal(false);
    setCurrentOrder(null);
  };

  const handleSaveMenu = (event) => {
    event.preventDefault();
    const { date, first, second, side } = event.target.elements;
    const menuData = {
      date: date.value,
      first: first.value.split(","),
      second: second.value.split(","),
      side: side.value.split(","),
    };
    if (currentMenu) {
      updateMenu({ ...menuData, id: currentMenu._id }).then(loadMenus);
    } else {
      createMenu(menuData).then(loadMenus);
    }
    handleCloseMenuModal();
  };

  const handleSaveOrder = (event) => {
    event.preventDefault();
    const { taxCode, first, second, side } = event.target.elements;
    const orderData = {
      taxCode: taxCode.value,
      first: first.value,
      second: second.value,
      side: side.value,
    };
    if (currentOrder) {
      updateOrder({ ...orderData, id: currentOrder._id }).then(loadOrders);
    } else {
      createOrder(orderData).then(loadOrders);
    }
    handleCloseOrderModal();
  };

  const handleDeleteMenu = (id) => {
    const menuToDelete = menus.find((menu) => menu._id === id);
    handleShowConfirmModal(menuToDelete, "menu");
  };

  const handleDeleteOrder = (id) => {
    const orderToDelete = orders.find((order) => order._id === id);
    handleShowConfirmModal(orderToDelete, "order");
  };

  const handleDeleteOldMenus = async () => {
    try {
      await deleteOldMenus();
      loadMenus();
      alert("Menu vecchi di due settimane eliminati.");
    } catch (error) {
      alert("Errore durante l'eliminazione dei menu.");
    }
  };

  const handleDeleteOldOrders = async () => {
    try {
      await deleteOldOrders();
      loadOrders();
      alert("Ordini vecchi di due settimane eliminati.");
    } catch (error) {
      alert("Errore durante l'eliminazione degli ordini.");
    }
  };

  const handleShowConfirmModal = (item, type) => {
    setItemToDelete(item);
    setDeleteType(type);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setItemToDelete(null);
    setDeleteType(null);
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteType === "menu" && itemToDelete) {
        await deleteMenu(itemToDelete._id);
        loadMenus();
      } else if (deleteType === "order" && itemToDelete) {
        await deleteOrder(itemToDelete._id);
        loadOrders();
      }
      alert("Eliminazione completata con successo.");
    } catch (error) {
      alert("Errore durante l'eliminazione.");
    } finally {
      handleCloseConfirmModal();
    }
  };

  // Funzione per formattare la data in dd-mm-yyyy
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Container className="mt-5">
      <h1>Gestione Menu</h1>
      <Button variant="primary" onClick={() => handleShowMenuModal()}>
        Aggiungi Menu
      </Button>
      <Button variant="danger" onClick={handleDeleteOldMenus}>
        Elimina Menu Vecchi di Due Settimane
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Data</th>
            <th>Primo</th>
            <th>Secondo</th>
            <th>Contorno</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu._id}>
              <td>{formatDate(menu.date)}</td>
              <td>{menu.first.join(", ")}</td>
              <td>{menu.second.join(", ")}</td>
              <td>{menu.side.join(", ")}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleShowMenuModal(menu)}
                >
                  Modifica
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteMenu(menu._id)}
                >
                  Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showMenuModal} onHide={handleCloseMenuModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentMenu ? "Modifica Menu" : "Aggiungi Menu"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveMenu}>
          <Modal.Body>
            <Form.Group controlId="date">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                defaultValue={currentMenu ? currentMenu.date : ""}
              />
            </Form.Group>
            <Form.Group controlId="first">
              <Form.Label>Primo</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentMenu ? currentMenu.first.join(",") : ""}
                placeholder="Inserisci i primi piatti separati da virgola"
              />
            </Form.Group>
            <Form.Group controlId="second">
              <Form.Label>Secondo</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentMenu ? currentMenu.second.join(",") : ""}
                placeholder="Inserisci i secondi piatti separati da virgola"
              />
            </Form.Group>
            <Form.Group controlId="side">
              <Form.Label>Contorno</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentMenu ? currentMenu.side.join(",") : ""}
                placeholder="Inserisci i contorni separati da virgola"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseMenuModal}>
              Chiudi
            </Button>
            <Button variant="primary" type="submit">
              Salva
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <h1>Gestione Ordini</h1>
      <Button variant="primary" onClick={() => handleShowOrderModal()}>
        Aggiungi Ordine
      </Button>
      <Button variant="danger" onClick={handleDeleteOldOrders} className="mt-3">
        Elimina Ordini Vecchi di Due Settimane
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Codice Fiscale</th>
            <th>Primo</th>
            <th>Secondo</th>
            <th>Contorno</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.taxCode}</td>
              <td>{order.first}</td>
              <td>{order.second}</td>
              <td>{order.side}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleShowOrderModal(order)}
                >
                  Modifica
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteOrder(order._id)}
                >
                  Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showOrderModal} onHide={handleCloseOrderModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentOrder ? "Modifica Ordine" : "Aggiungi Ordine"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveOrder}>
          <Modal.Body>
            <Form.Group controlId="taxCode">
              <Form.Label>Codice Fiscale</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentOrder ? currentOrder.taxCode : ""}
                placeholder="Inserisci il codice fiscale"
              />
            </Form.Group>
            <Form.Group controlId="first">
              <Form.Label>Primo</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentOrder ? currentOrder.first : ""}
                placeholder="Inserisci il primo piatto"
              />
            </Form.Group>
            <Form.Group controlId="second">
              <Form.Label>Secondo</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentOrder ? currentOrder.second : ""}
                placeholder="Inserisci il secondo piatto"
              />
            </Form.Group>
            <Form.Group controlId="side">
              <Form.Label>Contorno</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentOrder ? currentOrder.side : ""}
                placeholder="Inserisci il contorno"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseOrderModal}>
              Chiudi
            </Button>
            <Button variant="primary" type="submit">
              Salva
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare questo{" "}
          {deleteType === "menu" ? "menu" : "ordine"}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPage;
