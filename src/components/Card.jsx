import React from 'react';
import '../styles/Card.css';

const Card = ({ image, name, price, brand, SKU, weight }) => {
  return (
    <div className="card">
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