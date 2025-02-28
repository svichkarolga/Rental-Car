import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/cars/operations.js';
import { selectCars } from '../../redux/cars/selectors.js';
import { toggleFavorite } from '../../redux/favorites/slice.js';
import { selectFavorites } from '../../redux/favorites/selectors.js';
import CarItem from '../CarItem/CarItem.jsx';
import styles from './CarList.module.css';

const CarList = ({ filters, page }) => {
  const dispatch = useDispatch();
  const carsData = useSelector(selectCars);
  const cars = carsData?.cars || [];
  const favorites = useSelector(selectFavorites);
  const [allCars, setAllCars] = useState([]);

  useEffect(() => {
    dispatch(fetchCars({ page, filters })).then(action => {
      if (action.payload) {
        setAllCars(prevCars =>
          page === 1
            ? action.payload.cars
            : [...prevCars, ...action.payload.cars]
        );
      }
    });
  }, [dispatch, page, filters]);

  const filteredCars = allCars.filter(car => {
    const matchesBrand = filters.brand ? car.brand === filters.brand : true;
    const matchesPrice = filters.rentalPrice
      ? Number(car.rentalPrice) === Number(filters.rentalPrice)
      : true;
    const matchesMinMileage = filters.minMileage
      ? car.mileage >= Number(filters.minMileage)
      : true;
    const matchesMaxMileage = filters.maxMileage
      ? car.mileage <= Number(filters.maxMileage)
      : true;

    return (
      matchesBrand && matchesPrice && matchesMinMileage && matchesMaxMileage
    );
  });

  if (!Array.isArray(cars) || cars.length === 0) {
    return <p>Loading...</p>;
  }

  // if (!cars.length) {
  //   return <p>Loading...</p>;
  // }

  // const handleCardClick = car => {
  //   console.log('Clicked car:', car);
  //   // Здесь можно реализовать открытие модального окна с детальной информацией
  // };

  const handleFavoriteToggle = carId => {
    dispatch(toggleFavorite(carId));
  };

  return (
    <div>
      <ul className={styles.container}>
        {filteredCars.map(car => (
          <li className={styles.box} key={car.id}>
            <CarItem
              car={car}
              // onCardClick={() => handleCardClick(car)}
              isFavorite={favorites.includes(car.id)}
              onFavoriteToggle={() => handleFavoriteToggle(car.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
