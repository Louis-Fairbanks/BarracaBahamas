import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { CartContext } from '../contexts/CartContext';
import "../styles/Stripe.css"

const Stripe = () => {
  const cartContext = useContext(CartContext);
  const { cartItems, clearCart } = cartContext;
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const publishableKey = 'pk_test_51NzgYtIp3nxGOTmTzg9e6iTUwSs8NOxRyY73wG29OJCBX6dTQzxQG2dwCWgn8NEv9LObFRyou7QtyzIIFKAN4vQ900ZKAUuime';
    setStripePromise(loadStripe(publishableKey));
  }, []);

  const handlePayment = async (event) => {
    event.preventDefault();
    const stripe = await stripePromise;
    const elements = useElements();
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Payment Method:', paymentMethod);
      // Process the payment method on the server-side
    }
  };

  return (
    <div id='stripe'>
      <h1>Muestra de Stripe</h1>
      <Elements stripe={stripePromise}>
        <form onSubmit={handlePayment}>
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
          <button className='btn' type="submit">Pagar</button>
        </form>
      </Elements>
    </div>
  );
};

export default Stripe;