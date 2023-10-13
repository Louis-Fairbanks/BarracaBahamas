import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { UserContext } from './UserContext';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const cookies = new Cookies();
  const userContext = useContext(UserContext);
  const { user } = userContext; 

  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = cookies.get('currentCart');
    return storedCartItems ? storedCartItems : [];
  });

  const updateLocalStorage = (newArray) => {
    const loggedInUser = cookies.get('loggedInUser');
    if(loggedInUser){
      const userCartKey = loggedInUser.username + 'Cart'
      localStorage.setItem(userCartKey, JSON.stringify(newArray));}
  }

  const addToCart = (item) => {
    const updatedCartItems = [...cartItems, item];
    setCartItems(updatedCartItems);
    cookies.set('currentCart', JSON.stringify(updatedCartItems));
    updateLocalStorage(updatedCartItems)
  };
  
  const removeFromCart = (SKU) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter((item) => item.SKU !== SKU);
      cookies.set('currentCart', JSON.stringify(updatedCartItems));
      updateLocalStorage(updatedCartItems);
      return updatedCartItems;
    });
  };
  
  const adjustQuantity = (quantity, SKU) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) => {
        if (item.SKU === SKU) {
          const updatedQuantity = item.quantity + quantity;
          if (updatedQuantity < 1) {
            removeFromCart(SKU); // Call removeFromCart if quantity goes below 1
            return null; // Return null to remove the item from the updatedCartItems array
          }
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      }).filter(Boolean); // Filter out null values from the updatedCartItems array
      cookies.set('currentCart', JSON.stringify(updatedCartItems));
      updateLocalStorage(updatedCartItems);
      return updatedCartItems;
    });
  };
  
  const clearCart = () => {
    setCartItems([]);
    cookies.remove('currentCart');
  };

  useEffect(() => {
    try {
      const loggedInUser = cookies.get('loggedInUser');
      if (loggedInUser) {
        const userCartKey = loggedInUser.username + 'Cart';
        const storedUserCartItems = localStorage.getItem(userCartKey);
        if (storedUserCartItems) {
          setCartItems(JSON.parse(storedUserCartItems));
        }
      }
    } catch (error) {
      console.log('User not logged in');
    }
  }, [user]);
  

  return (
    <CartContext.Provider
      value={{ cartItems, adjustQuantity, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };