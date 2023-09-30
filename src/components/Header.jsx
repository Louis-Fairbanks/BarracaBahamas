import {React, useState, useEffect} from "react"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import barracaBahamasFavicon from "../assets/barracaBahamasFavicon.svg";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../styles/Home.css'

export default function Header({filters}){
    const [items, setItems] = useState(0);
    const [username, setUsername] = useState('Mi Cuenta')
    const navigate = useNavigate()
    const { searchTerm } = useParams();
    const [placeholder, setPlaceholder] = useState('Buscar todos los productos')

    useEffect(() => {
        if(searchTerm){
          setPlaceholder(searchTerm)
        }
    }, [])

    const handleSearch = (e) => {
      e.preventDefault();
      const newSearchTerm = e.target.elements.search.value;
  
      let queryParameter = '/productos/' + newSearchTerm;
      if (filters) {
        queryParameter += `?filtros=${filters}`;
      }
  
      navigate(queryParameter, { replace: true });
    };

return(
<div id="header">
<div className="row-element" onClick={() => {navigate('/')}}>
  <img src={barracaBahamasFavicon} alt="barraca Bahamas logo" />
  <h1 className="gradient-text">Barraca Bahamas</h1>
</div>
        <div className="searchbar row-element">
            <form onSubmit={handleSearch}>
                <input type="text" name='search' placeholder={placeholder} />
                <button><SearchIcon/></button>
            </form>
        </div>
<div className="row-element">
  <h2 onClick={() => {navigate('/contacto')}} className="jumping-heading">Contacto</h2>
  <h2 onClick={() => {navigate('/productos')}} className="jumping-heading">Productos</h2>
  <ShoppingCartIcon id="cartIcon" />
  <button id='itemsButton'>{items}</button>
  <h2 onClick={() => {navigate('/inicio')}} className="jumping-heading">{username}</h2>
  <AccountCircleIcon onClick={() => {navigate('/inicio')}} id="accountIcon" />
</div>
</div>)
}