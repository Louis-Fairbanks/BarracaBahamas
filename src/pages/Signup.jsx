import React from "react";
import Header from "../components/Header";
import '../styles/Signup.css';
import Footer from "../components/Footer";

export default function Signup(){
    return <div id='signupSection'>
        <Header/>
            <div id="signupBody">
            <h1>Registrate Ahora!</h1>
                <form className="login-form">
                    <input placeholder="Email"></input>
                    <input placeholder="Usuario"></input>
                    <input placeholder="Telefono (opcional)"></input>
                    <input placeholder="Contrasena" type="password"></input>
                    <button className="btn">Registrame</button>
                </form>
            </div>
        <Footer/>
    </div>
}