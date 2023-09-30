import React from "react";
import {Routes, Route} from "react-router-dom";
import './styles/App.css'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";

export default function App() {

  return (
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='/contacto' element={<Contact/>}/>
          <Route path='/inicio' element={<Login/>}/>
          <Route path='/inscripciones' element={<Signup/>}/>
          <Route path='/productos' element={<Products/>}/>
          <Route path='/productos/:searchTerm' element={<Products/>}/>
        </Routes> 
  )
}