import React from 'react';

const formatAddress = address => {
  const parts = address.split(', ');
  return `${parts[1]} | ${parts[2]}`;
};

const CarItem = ({
  onCardClick,
  car: {
    img,
    brand,
    model,
    year,
    rentalPrice,
    address,
    rentalCompany,
    type,
    mileage,
  },
}) => {
  return (
    <div>
      <div>
        <svg width="16" height="15">
          <use href="/public/icons/LinkedSprite.svg#heart" />
        </svg>
        <img src={img} alt={brand} />
      </div>
      <h4>
        {brand} <span>{model}</span>,{year}
      </h4>
      <h4>${rentalPrice}</h4>
      <p>
        {formatAddress(address)}|{rentalCompany}
      </p>
      <p>
        {type}| {mileage}
      </p>
      <div>
        <button onClick={() => onCardClick(car)}>Read more</button>
      </div>
    </div>
  );
};

export default CarItem;
