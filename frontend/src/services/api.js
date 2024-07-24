import axios from "axios";

// Crea un'istanza di Axios
const api = axios.create({
  baseURL: "http://localhost:5050", // URL del tuo backend
});

// Configura l'istanza Axios per includere il token JWT in ogni richiesta
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Menu APIs
export const getMenuOfTheDay = () => api.get("/menus/today");
export const getMenuByDate = (date) =>
  api.get("/menus/by-date", { data: { date } });
export const getMenus = () => api.get("/menus");
export const createMenu = (menuData) => api.post("/menus", menuData);
export const updateMenu = (menuData) => api.patch("/menus", menuData);
export const deleteMenu = (id) => api.delete("/menus", { data: { id } });
export const deleteOldMenus = () => api.delete("/menus/delete-old");

// Order APIs
export const getOrders = () => api.get("/orders");
export const createOrder = (orderData) => api.post("/orders", orderData);
export const updateOrder = (orderData) => api.patch("/orders", orderData);
export const deleteOrder = (id) => api.delete("/orders", { data: { id } });
export const resetOrdersAndTickets = () => api.delete("/orders/reset");
export const getLastOrder = () => api.get("/orders/last");
// User APIs
export const registerUser = (userData) => api.post("/users/register", userData);
export const loginUser = (credentials) => api.post("/users/login", credentials);
export const getUsers = () => api.get("/users");
export const createUser = (userData) => api.post("/users", userData);
export const updateUser = (userData) => api.patch("/users", userData);
export const deleteUser = (id) => api.delete("/users", { data: { id } });
