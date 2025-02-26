import React from 'react';
import styles from './CarItem.module.css';

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
      {/* <svg width="16" height="15">
        <use href="/public/icons/LinkedSprite.svg#heart" />
      </svg> */}
      <img className={styles.picture} src={img} alt={brand} />
      <div className={styles.boxTitle}>
        <h7 className={styles.title}>
          {brand} <span className={styles.span}>{model}</span>, {year}
        </h7>
        <p>${rentalPrice}</p>
      </div>
      <p className={styles.text}>
        {formatAddress(address)} | {rentalCompany} |
      </p>
      <p className={styles.text}>
        {type} | {mileage} km
      </p>
      <div className={styles.btnBox}>
        <button className={styles.btn} onClick={() => onCardClick(car)}>
          Read more
        </button>
      </div>
    </div>
  );
};

export default CarItem;
