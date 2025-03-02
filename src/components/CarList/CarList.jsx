import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/cars/operations.js';
import { selectCars } from '../../redux/cars/selectors.js';
import { toggleFavorite } from '../../redux/favorites/slice.js';
import { selectFavorites } from '../../redux/favorites/selectors.js';
import CarItem from '../CarItem/CarItem.jsx';
import styles from './CarList.module.css';
import { PropagateLoader } from 'react-spinners';

const CarList = ({ filters, page, setTotalPages }) => {
  const dispatch = useDispatch();
  const carsData = useSelector(selectCars);
  const cars = carsData?.cars || [];
  const favorites = useSelector(selectFavorites);
  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchCars({ page, filters })).then(action => {
      if (action.payload) {
        setAllCars(prevCars =>
          page === 1
            ? action.payload.cars
            : [...prevCars, ...action.payload.cars]
        );
        if (setTotalPages) {
          setTotalPages(action.payload.totalPages);
        }
      }
      setIsLoading(false);
    });
  }, [dispatch, page, filters, setTotalPages, setTotalPages]);

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
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
      >
        {isLoading ? (
          <PropagateLoader color="#3470ff" size={15} />
        ) : (
          <p>No cars was found</p>
        )}
      </div>
    );
  }

  const handleFavoriteToggle = carId => {
    dispatch(toggleFavorite(carId));
  };

  return (
    <div>
      <ul className={styles.container}>
        {filteredCars.map((car, index) => (
          <li className={styles.box} key={`${car.id}-${index}`}>
            <CarItem
              car={car}
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
