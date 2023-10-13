import React, { useContext } from "react";
import '../styles/Cart.css'
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

export default function CartComponent() {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);

  const { cartItems } = cartContext;

  let totalPrice;
  if(cartItems){
  totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);}

  return (
    <div className="cart-container" onClick={() => navigate('/pagar')}>
      {cartItems && cartItems.map((item, index) => (
        <div key={index} className="cart-item">
        <div><p>{item.quantity} x {item.name}</p></div>
        <div><p>Subtotal: ${item.quantity * item.price}</p></div> 
        </div>
      ))}
      <div className="cart-total">
        <p>Precio Total: ${totalPrice}</p>
      </div>
    </div>
  );
}