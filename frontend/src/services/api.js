import axios from "axios";

const API_URL = "http://localhost:5050";

// Menu APIs
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

// Order APIs
export const getOrders = () => axios.get(`${API_URL}/orders`);
export const createOrder = (orderData) =>
  axios.post(`${API_URL}/orders`, orderData);
export const updateOrder = (orderData) =>
  axios.patch(`${API_URL}/orders`, orderData);
export const deleteOrder = (id) =>
  axios.delete(`${API_URL}/orders`, { data: { id } });
export const deleteOldOrders = () =>
  axios.delete(`${API_URL}/orders/delete-old`);

// User APIs
export const registerUser = (userData) =>
  axios.post(`${API_URL}/users/register`, userData);
export const loginUser = (credentials) =>
  axios.post(`${API_URL}/users/login`, credentials);
export const getUsers = () => axios.get(`${API_URL}/users`);
export const createUser = (userData) =>
  axios.post(`${API_URL}/users`, userData);
export const updateUser = (userData) =>
  axios.patch(`${API_URL}/users`, userData);
export const deleteUser = (id) =>
  axios.delete(`${API_URL}/users`, { data: { id } });
