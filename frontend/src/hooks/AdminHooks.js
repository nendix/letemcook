import { useState, useEffect } from "react";
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
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/api";

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

  useEffect(() => {
    loadMenus();
    loadOrders();
    loadUsers();
  }, []);

  const loadMenus = () =>
    getMenus().then((response) => setMenus(response.data));
  const loadOrders = () =>
    getOrders().then((response) => setOrders(response.data));
  const loadUsers = () =>
    getUsers().then((response) => setUsers(response.data));

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

  const handleShowUserModal = (user = null) => {
    setCurrentUser(user);
    setShowUserModal(true);
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
    setCurrentUser(null);
  };

  const handleSaveMenu = (event) => {
    event.preventDefault();
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
    const menuToDelete = menus.find((menu) => menu._id === id);
    handleShowConfirmModal(menuToDelete, "menu");
  };

  const handleDeleteOrder = (id) => {
    const orderToDelete = orders.find((order) => order._id === id);
    handleShowConfirmModal(orderToDelete, "order");
  };

  const handleDeleteUser = (id) => {
    const userToDelete = users.find((user) => user._id === id);
    handleShowConfirmModal(userToDelete, "user");
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
    menus,
    orders,
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
    handleDeleteOldOrders,
    handleShowConfirmModal,
    handleCloseConfirmModal,
    handleConfirmDelete,
  };
};
