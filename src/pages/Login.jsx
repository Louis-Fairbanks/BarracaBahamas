import React    from "react";
import Header from "../components/Header";
import '../styles/Login.css'
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Login(){
    const navigate = useNavigate();

    return <div id='loginSection'>
        <Header/>
            <div id='loginBody'>
            <h1>Entrando en tu cuenta te deja:</h1>
            <ul>
                <li>Hacer compras con facturacion online</li>
                <li>Mantener tu carrito entre sesiones</li>
                <li>Tener un historial de compras</li>
            </ul>
            <form className="login-form">
                <input placeholder="Email/Usuario"></input>
                <input placeholder="Contrasena" type="password"></input>
                <button className="btn" type="submit">Loguear</button>
            </form>
            <h4 onClick={() => {navigate('/inscripciones')}}>No tenes una cuenta todavia? Registrate aqui con solo un mail</h4>
            </div>
            <Footer/>   
        </div>
}