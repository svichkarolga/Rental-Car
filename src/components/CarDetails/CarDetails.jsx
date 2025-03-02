import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { getCarById } from '../../redux/cars/operations';
import BookForm from '../BookForm/BookForm';
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

  const formatMileage = mileage => {
    if (!mileage) return 'N/A';
    return new Intl.NumberFormat('en-US').format(mileage).replace(/,/g, ' ');
  };

  return (
    <div className={styles.parentBox}>
      <div className={styles.boxImgForm}>
        <img className={styles.picture} src={car.img} alt={car.brand} />
        <div className={styles.bookForm}>
          <h3 className={styles.titleForm}>Book your car now</h3>
          <p className={styles.textForm}>
            Stay connected! We are always ready to help you.
          </p>
          <BookForm />
        </div>
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
            Mileage: {formatMileage(car.mileage)} km
          </p>
        </div>
        <p className={styles.price}> ${car.rentalPrice}</p>
        <p className={styles.text}>{car.description}</p>
        <div className={styles.container1}>
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
        <div className={styles.container2}>
          <h3 className={styles.title2}>Car Specifications:</h3>
          <div className={styles.specBox}>
            <svg className={styles.svgSpec} width="16" height="16">
              <use href="/icons/LinkedSprite.svg#calendar"></use>
            </svg>
            <p className={styles.text}>Year: {car.year}</p>
          </div>
          <div className={styles.specBox}>
            <svg className={styles.svgSpec} width="16" height="16">
              <use href="/icons/LinkedSprite.svg#car"></use>
            </svg>
            <p className={styles.text}>Type: {car.type}</p>
          </div>
          <div className={styles.specBox}>
            <svg className={styles.svgSpec} width="16" height="16">
              <use href="/icons/LinkedSprite.svg#patrol"></use>
            </svg>
            <p className={styles.text}>
              Fuel Consumption: {car.fuelConsumption}
            </p>
          </div>
          <div className={styles.specBox}>
            <svg className={styles.svgSpec} width="16" height="16">
              <use href="/icons/LinkedSprite.svg#settings"></use>
            </svg>
            <p className={styles.text}>Engine Size: {car.engineSize}</p>
          </div>
        </div>
        <div className={styles.container3}>
          <h3 className={styles.title}>Accessories and functionalities:</h3>
          <ul>
            {car.accessories.map((accessory, index) => (
              <li className={styles.condition} key={index}>
                <svg className={styles.svgCircle} width="16" height="16">
                  <use href="/icons/LinkedSprite.svg#check-circle"></use>
                </svg>
                {accessory}
              </li>
            ))}
          </ul>
          <ul>
            {car.functionalities.map((functional, index) => (
              <li className={styles.condition} key={index}>
                <svg className={styles.svgCircle} width="16" height="16">
                  <use href="/icons/LinkedSprite.svg#check-circle"></use>
                </svg>
                {functional}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
