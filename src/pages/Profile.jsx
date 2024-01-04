import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";
import Cookies from "universal-cookie";
import '../styles/Profile.css'


export default function Profile() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);
  const cookies = new Cookies();

  const { user, login, logout, editUser} = userContext;
  const { clearCart } = cartContext;
  const [phoneInput, setPhoneInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showAddressInput, setShowAddressInput] = useState(false);

  const handlePhoneInputChange = (e) => {
    setPhoneInput(e.target.value);
  };

  const handleAddressInputChange = (e) => {
    setAddressInput(e.target.value);
  };

  const handlePhoneSave = () => {
    editUser({ phone: phoneInput });
    setShowPhoneInput(false);
    setPhoneInput('');
  };

  const handleAddressSave = () => {
    editUser({ address: addressInput });
    setShowAddressInput(false);
    setAddressInput('');
  };

  useEffect(() => {
    try{
    const userToParse = cookies.get('loggedInUser');
    if(userToParse){
      login(userToParse)
    }} catch(err){
      console.log(err)
      navigate('/')
    }
  }, [])

  const handleLogout = () => {
    logout();
    clearCart();
    navigate('/inicio')
  };

  

  return (
    <div id='profile'>
      <Header />
      <div id="profileSection">
        <h1>Bienvenido, {user && user.username}!</h1>
        <div className="datos">
      <h2>Datos Personales</h2>
      <h3>Email: {user && user.email}</h3>
      <h3>
        Teléfono:{' '}
        {user && user.phone ? (
          <>
            {user.phone}
              <button onClick={() => setShowPhoneInput(true)}>Cambiar Teléfono</button>
          </>
        ) : (
          <button onClick={() => setShowPhoneInput(true)}>Agregar Teléfono</button>
        )}
        {showPhoneInput &&               <>
                <input type="text" value={phoneInput} onChange={handlePhoneInputChange} />
                <button onClick={handlePhoneSave}>Guardar</button>
              </>}
      </h3>
      <h3>
        Dirección:{' '}
        {user && user.address ? (
          <>
            {user.address}
            <button onClick={() => setShowAddressInput(true)}>Cambiar dirección de despacho</button>
          </>
        ) : (
          <button onClick={() => setShowAddressInput(true)}>Agregar dirección de despacho</button>
        )}
          {showAddressInput && <><input type="text" value={addressInput} onChange={handleAddressInputChange} />
                <button onClick={handleAddressSave}>Guardar</button></>}
      </h3>
    </div>
        <div id='historial'>
          <h2>Historial de Compras</h2>
          <table>
    <thead>
      <tr>
        <th>Compra ID</th>
        <th>Fecha</th>
        <th>Detalles</th>
        <th>Importe</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td>Todavía no has hecho ninguna compra!</td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <button onClick={handleLogout}>Salir</button>
        </div>
      </div>
      <Footer/>
    </div>
  );
}