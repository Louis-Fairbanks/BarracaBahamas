import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { products } from "../assets/products";
import '../styles/Item.css'
import { CartContext } from "../contexts/CartContext";

export default function Item() {
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams();
  const product = products.find(product => product.SKU == id)
  const cartContext = useContext(CartContext);

  const { addToCart} = cartContext;

  const handleAddToCart = () => {

    const productInfo = { 
        name: product.name,
        quantity : quantity,
        price : product.price,
        SKU : product.SKU
    }
    
    addToCart(productInfo)
    product.stock -= quantity;
    setQuantity(1);
  };

  return (
    <div id='itemSection'>
    <Header />
      <div id="itemBody">
        <div>
          <img src={product.image} alt="Product" />
        </div>
        <div>
          <h1>{product.name}</h1>
          <h3>Precio: ${product.price}</h3>
          <p>Stock: {product.stock}</p>
          <p>Marca: {product.brand}</p>
          <p>SKU: {product.SKU}</p>
          <p>Peso: {product.weight} lbs</p>
          <div>
            <button id='addButton' className="btn" onClick={handleAddToCart}>Agregar al carrito</button>
            <div id='adjustQuantity'>
              <h5 id='quantityMarker'>Cantidad:</h5>
              <button id='minusButton' onClick={() => setQuantity(quantity - 1)}>-</button>
              <span>{quantity}</span>
              <button id='plusButton' onClick={() => setQuantity(quantity + 1)}>+</button>
              <h5>Precio Total: ${product.price * quantity}</h5>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}