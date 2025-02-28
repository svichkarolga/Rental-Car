import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { getCarById } from '../../redux/cars/operations';
import styles from './CarDetail.module.css';

const CarDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [car, setCar] = useState(location.state?.car || null);

  useEffect(() => {
    if (!car) {
      dispatch(getCarById({ carId: id })).then(action => {
        if (action.payload) {
          setCar(action.payload);
        }
      });
    }
  }, [dispatch, id, car]);

  const formatAddress = address => {
    const parts = address.split(', ');
    return `${parts[1]} , ${parts[2]}`;
  };

  return (
    <div className={styles.parentBox}>
      <div className={styles.boxImgForm}>
        <img className={styles.picture} src={car.img} alt={car.brand} />
      </div>
      <div className={styles.infoBox}>
        <h2 className={styles.headTitle}>
          {car.brand}, {car.year}
        </h2>
        <div className={styles.addressMileBox}>
          <svg className={styles.svg} width="16" height="16">
            <use href="/icons/LinkedSprite.svg#map"></use>
          </svg>
          <p className={styles.address}>{formatAddress(car.address)}</p>
          <p className={styles.text}>
            Mileage:
            {car.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}km
          </p>
        </div>
        <p className={styles.price}> ${car.rentalPrice}</p>
        <p className={styles.text}>{car.description}</p>
        <div className={styles.container}>
          <h3 className={styles.title}>Rental Conditions: </h3>
          <ul className={styles.conditionList}>
            {car.rentalConditions.map((condition, index) => (
              <li className={styles.condition} key={index}>
                <svg className={styles.svgCircle} width="16" height="16">
                  <use href="/icons/LinkedSprite.svg#check-circle"></use>
                </svg>
                {condition}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.container}>
          <h3 className={styles.title}>Car Specifications:</h3>
          <div>
            <svg width="16" height="16">
              <use href="/icons/LinkedSprite.svg#calendar"></use>
            </svg>
            <p className={styles.text}>Year: {car.year}</p>
          </div>

          <p className={styles.text}>Type: {car.type}</p>
          <p className={styles.text}>Fuel Consumption: {car.fuelConsumption}</p>
          <p className={styles.text}>Engine Size: {car.engineSize}</p>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
