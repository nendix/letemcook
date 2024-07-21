import { Container, Table, Button, Form, Modal } from "react-bootstrap";
import { useAdminHooks } from "../hooks/AdminHooks";
const ChefPage = () => {
  const {
    menus,
    orders,
    showMenuModal,
    showOrderModal,
    showConfirmModal,
    currentMenu,
    currentOrder,
    deleteType,
    formatDate,
    handleShowMenuModal,
    handleCloseMenuModal,
    handleSaveMenu,
    handleDeleteMenu,
    handleDeleteOldMenus,
    handleCloseConfirmModal,
    handleConfirmDelete,
  } = useAdminHooks();

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
                defaultValue={currentMenu ? currentMenu.first.join(", ") : ""}
              />
            </Form.Group>
            <Form.Group controlId="second">
              <Form.Label>Secondo</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentMenu ? currentMenu.second.join(", ") : ""}
              />
            </Form.Group>
            <Form.Group controlId="side">
              <Form.Label>Contorno</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentMenu ? currentMenu.side.join(", ") : ""}
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

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Codice Fiscale</th>
            <th>Primo</th>
            <th>Secondo</th>
            <th>Contorno</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.taxCode}</td>
              <td>{order.first}</td>
              <td>{order.second}</td>
              <td>{order.side}</td>
              <td>{order.ticket}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare questo{" "}
          {deleteType === "menu"
            ? "menu"
            : deleteType === "order"
              ? "ordine"
              : "utente"}
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ChefPage;
