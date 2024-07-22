import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { loginUser } from "../services/api";
import { jwtDecode } from "jwt-decode";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const usernameRef = useRef(null); // Creazione del ref

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []); // Questo effetto viene eseguito solo quando il componente viene montato

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      const token = response.data.token;
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);

      if (onLoginSuccess) {
        onLoginSuccess(); // Chiude il pop-up e gestisce la navigazione
      }
    } catch (error) {
      setMessage("Login fallito. Per favore controlla le tue credenziali.");
    }
  };

  return (
    <div className="login-container">
      <Form onSubmit={handleSubmit} className="form-content">
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            ref={usernameRef} // Assegna il ref al campo username
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {message && <Alert variant="danger">{message}</Alert>}

        <Button variant="primary" type="submit" className="submit-button">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
