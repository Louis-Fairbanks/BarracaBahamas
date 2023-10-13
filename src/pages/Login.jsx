import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import '../styles/Login.css'
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import bcrypt from 'bcryptjs';
import { UserContext } from "../contexts/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userContext = useContext(UserContext);

  const { user, login} = userContext;

  useEffect(() => {
    if(user){
      navigate('/perfil')
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if user exists and validate password
    if (localStorage.getItem(username)) {
      const userToLogin = localStorage.getItem(username)
      if (bcrypt.compareSync(password, JSON.parse(userToLogin).password)) {
        console.log("Login successful");
        login(JSON.parse(userToLogin));
        navigate('/perfil')
      } else {
        // Passwords do not match
        console.log("Incorrect password");
      }
    } else {
      // User not found
      console.log("User not found");
    }

    // Clear form inputs
    setUsername("");
    setPassword("");
  };

  return (
    <div id='loginSection'>
      <Header />
      <div id='loginBody'>
        <h1>Entrando en tu cuenta te deja:</h1>
        <ul>
          <li>Hacer compras con facturacion online</li>
          <li>Mantener tu carrito entre sesiones y dispositivos</li>
          <li>Tener un historial de compras</li>
        </ul>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            placeholder="Contrasena"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="btn" type="submit">Loguear</button>
        </form>
        <h4 onClick={() => { navigate('/inscripciones') }}>No tenes una cuenta todavia? Registrate aqui con solo un mail</h4>
      </div>
      <Footer />
    </div>
  );
}