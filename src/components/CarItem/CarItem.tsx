import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import styles from './CarItem.module.css';
import { Cars } from '../../types';

const formatAddress = (address: string): string => {
  const parts = address.split(', ');
  return `${parts[1]} | ${parts[2]}`;
};
const formatMileage = (mileage: number): string => {
  if (!mileage) return 'N/A';
  return new Intl.NumberFormat('en-US').format(mileage).replace(/,/g, ' ');
};

type CarItemProp = {
  onFavoriteToggle: () => void;
  isFavorite: boolean;
  car: Cars;
};

const CarItem: React.FC<CarItemProp> = ({
  onFavoriteToggle,
  isFavorite,
  car,
}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <FavoriteButton
          carId={car.id}
          isFavorite={isFavorite}
          onFavoriteToggle={onFavoriteToggle}
        />
      </div>
      <img className={styles.picture} src={car.img} alt={car.brand} />
      <div className={styles.boxTitle}>
        <h6 className={styles.title}>
          {car.brand} <span className={styles.span}>{car.model}</span>,{' '}
          {car.year}
        </h6>
        <p>${car.rentalPrice}</p>
      </div>
      <p className={styles.text}>
        {formatAddress(car.address)} | {car.rentalCompany} |
      </p>
      <p className={styles.text}>
        {car.type} | {formatMileage(car.mileage)} km
      </p>
      <div className={styles.btnBox}>
        <button
          className={styles.btn}
          onClick={() => navigate(`/catalog/${car.id}`, { state: { car } })}
        >
          Read more
        </button>
      </div>
    </div>
  );
};

export default CarItem;
