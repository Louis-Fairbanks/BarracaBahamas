import React, { useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CartContext } from '../contexts/CartContext';

const stripePromise = loadStripe('pk_test_51NzgYtIp3nxGOTmTzg9e6iTUwSs8NOxRyY73wG29OJCBX6dTQzxQG2dwCWgn8NEv9LObFRyou7QtyzIIFKAN4vQ900ZKAUuime');

const Stripe = () => {

    const cartContext = useContext(CartContext);
    const { cartItems, clearCart } = cartContext;

  const handlePayment = async () => {
    const stripe = await stripePromise;

    const lineItems = cartItems.map((item) => ({
      price: (item.price * 100).toString(), // Stripe expects the price in cents
      quantity: item.quantity,
    }));
  
      const { error } = await stripe.redirectToCheckout({
        lineItems,
        mode: 'payment',
        successUrl: 'https://localhost:5173/perfil',
        cancelUrl: 'https://localhost:5173/pagar',
      });
  
      if (error) {
        console.error('Error:', error);
      }
  };

  return (
    <div>
      <h1>Sample Stripe Integration</h1>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Stripe;