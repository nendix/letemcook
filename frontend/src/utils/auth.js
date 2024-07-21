import { jwtDecode } from "jwt-decode";
// Funzione per ottenere e decodificare il token JWT
export const getDecodedToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Token non valido:", error);
    return null;
  }
};

// Funzione per controllare se l'utente ha i permessi necessari
export const hasPermission = (role) => {
  const decodedToken = getDecodedToken();
  if (!decodedToken || !decodedToken.roles) return false;
  return decodedToken.roles.includes(role);
};
