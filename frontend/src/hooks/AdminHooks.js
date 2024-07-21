import { useState, useEffect } from "react";
import {
  getMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  deleteOldMenus,
  resetOrdersAndTickets,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/api";

import { hasPermission } from "../utils/auth";

export const useAdminHooks = () => {
  const [menus, setMenus] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null); // "menu", "order" o "user"
  const [menuError, setMenuError] = useState("");
  const [orderError, setOrderError] = useState("");
  const [userError, setUserError] = useState("");
  useEffect(() => {
    loadMenus();
    loadOrders();
    loadUsers();
  }, []);

  const loadMenus = async () => {
    try {
      const response = await getMenus();
      if (response.data.length === 0) {
        setMenuError("Nessun menu disponibile nel database.");
      } else {
        setMenus(response.data);
        setMenuError(""); // Resetta l'errore se ci sono dati
      }
    } catch (err) {
      setMenuError("Errore durante il caricamento dei menu.");
      console.error(err);
    }
  };

  const loadOrders = async () => {
    try {
      const response = await getOrders();
      if (response.data.length === 0) {
        setOrderError("Nessun ordine disponibile nel database.");
      } else {
        setOrders(response.data);
        setOrderError(""); // Resetta l'errore se ci sono dati
      }
    } catch (err) {
      setOrderError("Errore durante il caricamento degli ordini.");
      console.error(err);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      if (response.data.length === 0) {
        setUserError("Nessun utente disponibile nel database.");
      } else {
        setUsers(response.data);
        setUserError(""); // Resetta l'errore se ci sono dati
      }
    } catch (err) {
      setUserError("Errore durante il caricamento degli utenti.");
      console.error(err);
    }
  };

  const handleShowMenuModal = (menu = null) => {
    if (hasPermission("admin")) {
      setCurrentMenu(menu);
      setShowMenuModal(true);
    } else {
      alert("Non hai i permessi necessari.");
    }
  };

  const handleCloseMenuModal = () => {
    setShowMenuModal(false);
    setCurrentMenu(null);
  };

  const handleShowOrderModal = (order = null) => {
    if (hasPermission("admin")) {
      setCurrentOrder(order);
      setShowOrderModal(true);
    } else {
      alert("Non hai i permessi necessari.");
    }
  };

  const handleCloseOrderModal = () => {
    setShowOrderModal(false);
    setCurrentOrder(null);
  };

  const handleShowUserModal = (user = null) => {
    if (hasPermission("admin")) {
      setCurrentUser(user);
      setShowUserModal(true);
    } else {
      alert("Non hai i permessi necessari.");
    }
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
    setCurrentUser(null);
  };

  const handleSaveMenu = (event) => {
    event.preventDefault();
    if (!hasPermission("admin")) {
      alert("Non hai i permessi necessari.");
      return;
    }
    const { date, first, second, side } = event.target.elements;
    const menuData = {
      date: date.value || currentMenu.date,
      first:
        first.value.split(",").map((item) => item.trim()) || currentMenu.first,
      second:
        second.value.split(",").map((item) => item.trim()) ||
        currentMenu.second,
      side:
        side.value.split(",").map((item) => item.trim()) || currentMenu.side,
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
    if (!hasPermission("admin")) {
      alert("Non hai i permessi necessari.");
      return;
    }
    const { taxCode, first, second, side } = event.target.elements;
    const orderData = {
      taxCode: taxCode.value || currentOrder.taxCode,
      first: first.value || currentOrder.first,
      second: second.value || currentOrder.second,
      side: side.value || currentOrder.side,
    };
    if (currentOrder) {
      updateOrder({ ...orderData, id: currentOrder._id }).then(loadOrders);
    } else {
      createOrder(orderData).then(loadOrders);
    }
    handleCloseOrderModal();
  };

  const handleSaveUser = (event) => {
    event.preventDefault();
    if (!hasPermission("admin")) {
      alert("Non hai i permessi necessari.");
      return;
    }
    const { username, roles, password } = event.target.elements;

    const userData = {
      username: username.value || currentUser.username,
      roles:
        roles.value.split(",").map((item) => item.trim()) || currentUser.roles,
    };

    if (password.value) {
      userData.password = password.value;
    }

    if (currentUser) {
      updateUser({ ...userData, id: currentUser._id }).then(loadUsers);
    } else {
      createUser(userData).then(loadUsers);
    }
    handleCloseUserModal();
  };

  const handleDeleteMenu = (id) => {
    if (hasPermission("admin")) {
      const menuToDelete = menus.find((menu) => menu._id === id);
      handleShowConfirmModal(menuToDelete, "menu");
    } else {
      alert("Non hai i permessi necessari.");
    }
  };

  const handleDeleteOrder = (id) => {
    if (hasPermission("admin")) {
      const orderToDelete = orders.find((order) => order._id === id);
      handleShowConfirmModal(orderToDelete, "order");
    } else {
      alert("Non hai i permessi necessari.");
    }
  };

  const handleDeleteUser = (id) => {
    if (hasPermission("admin")) {
      const userToDelete = users.find((user) => user._id === id);
      handleShowConfirmModal(userToDelete, "user");
    } else {
      alert("Non hai i permessi necessari.");
    }
  };

  const handleDeleteOldMenus = async () => {
    if (!hasPermission("admin")) {
      alert("Non hai i permessi necessari.");
      return;
    }
    try {
      await deleteOldMenus();
      loadMenus();
      alert("Menu vecchi di due settimane eliminati.");
    } catch (error) {
      alert("Errore durante l'eliminazione dei menu.");
    }
  };

  const handleResetOrdersAndTickets = async () => {
    if (!hasPermission("admin")) {
      alert("Non hai i permessi necessari.");
      return;
    }
    try {
      await resetOrdersAndTickets();
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
      } else if (deleteType === "user" && itemToDelete) {
        await deleteUser(itemToDelete._id);
        loadUsers();
      }
    } catch (error) {
      alert("Errore durante l'eliminazione.");
    } finally {
      handleCloseConfirmModal();
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return {
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
    itemToDelete,
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
    handleShowConfirmModal,
    handleCloseConfirmModal,
    handleConfirmDelete,
  };
};
