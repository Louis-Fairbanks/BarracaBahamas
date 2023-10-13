import React, { useContext, useState } from "react";
import '../styles/Checkout.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";
import Stripe from "../components/Stripe";

export default function Checkout() {
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);
  const { user } = userContext;
  const { cartItems, adjustQuantity } = cartContext;
  const [proceed, setProceed] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);

  return (
    <div className="checkout-container">
      <Header />
      <div className="checkout-list">
        <div className="cart-header">
          <h2 id='nombre-columna'>Nombre</h2>
          <h2>Precio</h2>
          <h2>Cantidad</h2>
          <h2>Subtotal</h2>
        </div>
        {cartItems.map((item, index) => (
          <div className="cart-item-details" key={index}>
            <p id='cart-item-name'>{item.name}</p>
            <p>${item.price}</p>
            <div id='adjustQuantity' className="adjust-quantity">
              <button id='minusButton' onClick={() => adjustQuantity(-1, item.SKU)}>-</button>
              <span>{item.quantity}</span>
              <button id='plusButton' onClick={() => adjustQuantity(1, item.SKU)}>+</button>
            </div>
            <p>${item.price * item.quantity}</p>
          </div>
        ))}
        <div className="cart-total">
          <p style={{flex: 5}}>Precio Total</p>
          <p>${totalPrice}</p>
        </div>
      <button onClick={() => {setProceed(true)}}
      className="proceed-to-pay-button jumping-heading">Continuar</button>
      {proceed && <Stripe/>}
      </div>
      <Footer />
    </div>
  );
}