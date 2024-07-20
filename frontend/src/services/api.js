import axios from "axios";

const API_URL = "http://localhost:5050";

export const getMenuOfTheDay = () => axios.get(`${API_URL}/menus/today`);
export const getMenuByDate = (date) =>
  axios.get(`${API_URL}/menus/by-date`, { data: { date } });
export const getMenus = () => axios.get(`${API_URL}/menus`);
export const createMenu = (menuData) =>
  axios.post(`${API_URL}/menus`, menuData);
export const updateMenu = (menuData) =>
  axios.patch(`${API_URL}/menus`, menuData);
export const deleteMenu = (id) =>
  axios.delete(`${API_URL}/menus`, { data: { id } });
export const deleteOldMenus = () => axios.delete(`${API_URL}/menus/delete-old`);

export const getOrders = () => axios.get(`${API_URL}/orders`);
export const createOrder = (orderData) =>
  axios.post(`${API_URL}/orders`, orderData);
export const updateOrder = (orderData) =>
  axios.patch(`${API_URL}/orders`, orderData);
export const deleteOrder = (id) =>
  axios.delete(`${API_URL}/orders`, { data: { id } });
export const deleteOldOrders = () =>
  axios.delete(`${API_URL}/orders/delete-old`);
