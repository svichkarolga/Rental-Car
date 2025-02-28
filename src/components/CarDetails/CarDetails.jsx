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
        <h2 className={styles.title}>
          {car.brand}, {car.year}
        </h2>
        <div className={styles.addressMileBox}>
          <img
            className={styles.svg}
            src="../../../public/icons/LinkedSprite.svg#map"
            alt="map"
          />
          <p>{formatAddress(car.address)}</p>
          <p className={styles.mileText}>
            Mileage:{' '}
            {car.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}km
          </p>
        </div>

        <p>Price: ${car.rentalPrice}</p>

        <p>Rental Company: {car.rentalCompany}</p>
      </div>
    </div>
  );
};

export default CarDetails;
