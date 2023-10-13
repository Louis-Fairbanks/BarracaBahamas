import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import '../styles/Signup.css';
import Footer from "../components/Footer";
import bcrypt from 'bcryptjs'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const { user, login } = userContext;

  useEffect(() => {
    if(user){
      navigate('/perfil')
    }
  }, [])

  const handleSignup = (e) => {
    e.preventDefault();
  
    // Create user object
    const newUser = {
      email,
      username,
      phone,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))};
  
    // Store user object in local storage
    localStorage.setItem(username, JSON.stringify(newUser));
    login(newUser);
  
    // Clear form inputs
    setEmail("");
    setUsername("");
    setPhone("");
    setPassword("");
    navigate('/perfil')
  };

  return (
    <div id='signupSection'>
      <Header />
      <div id="signupBody">
        <h1>Registrate Ahora!</h1>
        <form className="login-form" onSubmit={handleSignup}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            placeholder="Telefono (opcional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
          <input
            placeholder="Contrasena"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="btn" type="submit">Registrame</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}