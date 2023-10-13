import React, { useState, useEffect, useContext } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import barracaBahamasFavicon from "../assets/barracaBahamasFavicon.svg";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../styles/Home.css';
import CartComponent from "./CartDropdown";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import Cookies from "universal-cookie";

export default function Header({ filters }) {
  const [username, setUsername] = useState('Mi Cuenta');
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const [items, setItems] = useState(0)
  const [placeholder, setPlaceholder] = useState('Buscar todos los productos');
  const [showCart, setShowCart] = useState(false);
  const cookies = new Cookies();

  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext);

  const{ cartItems} = cartContext;
  const{ user } = userContext;

  useEffect(() => {
    if (searchTerm) {
      setPlaceholder(searchTerm);
    }
  }, []);

  useEffect(() => {
    if (cookies.get('loggedInUser')) {
      const userToParse = cookies.get('loggedInUser');
      setUsername(userToParse.username);
    }
  }, []);

  useEffect(() => {
    let itemCount = 0;
    cartItems.forEach(element => {
      itemCount += parseInt(element.quantity);
    });
    setItems(itemCount);
  }, [cartItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(event.target.id ==='cartIcon' || event.target.id === 'itemsButton'){
        return;
      }
      if (showCart && event.target.id !== 'cartDropdown') {
        setShowCart(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showCart]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newSearchTerm = e.target.elements.search.value;
    let queryParameter = '/productos/' + newSearchTerm;
    if (filters) {
      queryParameter += `?filtros=${filters}`;
    }
    navigate(queryParameter, { replace: true });
  };

  const navigateAccount = () => {
    username === 'Mi Cuenta' ? navigate('/inicio') : navigate('/perfil');
  };

  const showCartDropdown = () => {
    setShowCart(!showCart);
  };

  return (
    <div id="header">
      <div className="row-element" onClick={() => { navigate('/') }}>
        <img src={barracaBahamasFavicon} alt="barraca Bahamas logo" />
        <h1 className="gradient-text">Barraca Bahamas</h1>
      </div>
      <div className="searchbar row-element">
        <form onSubmit={handleSearch}>
          <input type="text" name='search' placeholder={placeholder} />
          <button><SearchIcon /></button>
        </form>
      </div>
      <div className="row-element">
        <h2 onClick={() => { navigate('/contacto') }} className="jumping-heading">Contacto</h2>
        <h2 onClick={() => { navigate('/productos') }} className="jumping-heading">Productos</h2>
        <ShoppingCartIcon id="cartIcon" onClick={showCartDropdown} />
        <button id='itemsButton' onClick={showCartDropdown}>{items}</button>
        <h2 onClick={navigateAccount} className="jumping-heading">{username}</h2>
        <AccountCircleIcon onClick={navigateAccount} id="accountIcon" />
      </div>
      {showCart && <CartComponent id='cartDropdown' show={showCart}/>}
    </div>
  );
}