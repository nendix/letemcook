import { useState, useEffect } from "react";
import {
  getMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  deleteOldMenus,
  getOrders,
} from "../services/api";

import { hasPermission } from "../utils/auth";

export const useChefHooks = () => {
  const [menus, setMenus] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null); // "menu", "order" o "user"
  const [menuError, setMenuError] = useState("");
  const [orderError, setOrderError] = useState("");

  useEffect(() => {
    loadMenus();
    loadOrders();
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

  const handleShowMenuModal = (menu = null) => {
    if (hasPermission("admin") || hasPermission("chef")) {
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

  const handleSaveMenu = (event) => {
    event.preventDefault();
    if (!hasPermission("admin") && !hasPermission("chef")) {
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

  const handleDeleteMenu = (id) => {
    if (hasPermission("admin") || hasPermission("chef")) {
      const menuToDelete = menus.find((menu) => menu._id === id);
      handleShowConfirmModal(menuToDelete, "menu");
    } else {
      alert("Non hai i permessi necessari.");
    }
  };

  const handleDeleteOldMenus = async () => {
    if (!hasPermission("admin") && !hasPermission("chef")) {
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
      await deleteMenu(itemToDelete._id);
      loadMenus();
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
    showMenuModal,
    showConfirmModal,
    currentMenu,
    itemToDelete,
    deleteType,
    formatDate,
    handleShowMenuModal,
    handleCloseMenuModal,
    handleSaveMenu,
    handleDeleteMenu,
    handleDeleteOldMenus,
    handleShowConfirmModal,
    handleCloseConfirmModal,
    handleConfirmDelete,
  };
};
