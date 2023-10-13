import React from 'react';
import '../styles/Card.css';
import { useNavigate } from 'react-router-dom';

const Card = ({ image, name, price, brand, SKU, weight }) => {
  
  const navigate = useNavigate();

  const navigateToItem = () => {
    const navigationString = '/' + SKU
    navigate(navigationString)}

  return (
    <div className="card" onClick={navigateToItem}>
      <img src={image} alt={name} className="card-image" />
      <div className="card-details">
        <div className='name-price'>
        <h2>{name}</h2>
        <p>${price}</p>
        </div>
        <p className="card-brand">Marca: {brand}</p>
        <p className="card-sku">SKU: {SKU}</p>
        <p className="card-weight">Peso: {weight} kg</p>
      </div>
    </div>
  );
};

export default Card;