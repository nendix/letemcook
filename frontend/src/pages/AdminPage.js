import { Container, Table, Button, Form, Modal, Alert } from "react-bootstrap";
import { useAdminHooks } from "../hooks/AdminHooks";
const AdminPage = () => {
  const {
    menuError,
    menus,
    orderError,
    orders,
    userError,
    users,
    showMenuModal,
    showOrderModal,
    showUserModal,
    showConfirmModal,
    currentMenu,
    currentOrder,
    currentUser,
    deleteType,
    formatDate,
    handleShowMenuModal,
    handleCloseMenuModal,
    handleShowOrderModal,
    handleCloseOrderModal,
    handleShowUserModal,
    handleCloseUserModal,
    handleSaveMenu,
    handleSaveOrder,
    handleSaveUser,
    handleDeleteMenu,
    handleDeleteOrder,
    handleDeleteUser,
    handleDeleteOldMenus,
    handleResetOrdersAndTickets,
    handleCloseConfirmModal,
    handleConfirmDelete,
  } = useAdminHooks();

  return (
    <Container className="mt-5">
      <h1>Gestione Menu</h1>
      {menuError && <Alert variant="danger">{menuError}</Alert>}
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

      <h1 className="mt-5">Gestione Ordini</h1>
      {orderError && <Alert variant="danger">{orderError}</Alert>}
      <Button variant="primary" onClick={() => handleShowOrderModal()}>
        Aggiungi Ordine
      </Button>
      <Button variant="danger" onClick={handleResetOrdersAndTickets}>
        Elimina Tutti Gli Ordini
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Codice Fiscale</th>
            <th>Primo</th>
            <th>Secondo</th>
            <th>Contorno</th>
            <th>Ticket</th>
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
              <td>{order.ticket}</td>
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
              />
            </Form.Group>
            <Form.Group controlId="first">
              <Form.Label>Primo</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentOrder ? currentOrder.first : ""}
              />
            </Form.Group>
            <Form.Group controlId="second">
              <Form.Label>Secondo</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentOrder ? currentOrder.second : ""}
              />
            </Form.Group>
            <Form.Group controlId="side">
              <Form.Label>Contorno</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentOrder ? currentOrder.side : ""}
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

      <h1 className="mt-5">Gestione Utenti</h1>
      {userError && <Alert variant="danger">{userError}</Alert>}
      <Button variant="primary" onClick={() => handleShowUserModal()}>
        Aggiungi Utente
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Username</th>
            <th>Ruoli</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.roles.join(", ")}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleShowUserModal(user)}
                >
                  Modifica
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showUserModal} onHide={handleCloseUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentUser ? "Modifica Utente" : "Aggiungi Utente"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveUser}>
          <Modal.Body>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentUser ? currentUser.username : ""}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password (leave blank to keep current)</Form.Label>
              <Form.Control type="password" placeholder="New password" />
            </Form.Group>
            <Form.Group controlId="roles">
              <Form.Label>Ruoli</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentUser ? currentUser.roles.join(", ") : ""}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUserModal}>
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

export default AdminPage;
