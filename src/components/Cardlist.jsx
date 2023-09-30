import React from 'react';
import Card from './Card';

const Cardlist = ({ cards }) => {
  return (
    <div id='cardlist'>
      {cards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          name={card.name}
          price={card.price}
          brand={card.brand}
          SKU={card.SKU}
          weight={card.weight}
        />
      ))}
    </div>
  );
};

export default Cardlist;
