import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import styles from './CarItem.module.css';

const formatAddress = address => {
  const parts = address.split(', ');
  return `${parts[1]} | ${parts[2]}`;
};

const CarItem = ({
  // onClick,
  onFavoriteToggle,
  isFavorite,
  car: {
    id,
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
  const navigate = useNavigate();
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <FavoriteButton
          carId={id}
          isFavorite={isFavorite}
          onFavoriteToggle={onFavoriteToggle}
        />
      </div>
      <img className={styles.picture} src={img} alt={brand} />
      <div className={styles.boxTitle}>
        <h6 className={styles.title}>
          {brand} <span className={styles.span}>{model}</span>, {year}
        </h6>
        <p>${rentalPrice}</p>
      </div>
      <p className={styles.text}>
        {formatAddress(address)} | {rentalCompany} |
      </p>
      <p className={styles.text}>
        {type} | {mileage} km
      </p>
      <div className={styles.btnBox}>
        <button
          className={styles.btn}
          onClick={() => navigate(`/catalog/${id}`)}
        >
          Read more
        </button>
      </div>
    </div>
  );
};

export default CarItem;
