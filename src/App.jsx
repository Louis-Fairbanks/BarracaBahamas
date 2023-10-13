import React from "react";
import {Routes, Route} from "react-router-dom";
import './styles/App.css'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Item from "./pages/Item";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./contexts/CartContext";
import { UserProvider } from "./contexts/UserContext";

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/contacto' element={<Contact />} />
          <Route path='/inicio' element={<Login />} />
          <Route path='/inscripciones' element={<Signup />} />
          <Route path='/productos' element={<Products />} />
          <Route path='/productos/:searchTerm' element={<Products />} />
          <Route path='/perfil' element={<Profile />} />
          <Route path='/:id' element={<Item/>} />
          <Route path="/pagar" element={<Checkout />} />
        </Routes>
      </CartProvider>
    </UserProvider>
  );
}