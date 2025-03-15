import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/cars/operations.js';
import { selectCars } from '../../redux/cars/selectors.js';
import { toggleFavorite } from '../../redux/favorites/slice.js';
import { selectFavorites } from '../../redux/favorites/selectors.js';
import CarItem from '../CarItem/CarItem.js';
import styles from './CarList.module.css';
import { PropagateLoader } from 'react-spinners';
import { AppDispatch } from '../../redux/store';
import { Cars } from '../../types';

type CarListProp = {
  filters: {
    brand?: string;
    rentalPrice?: number;
    minMileage?: number;
    maxMileage?: number;
  };
  page: number;
  setTotalPages: (total: number) => void;
};

const CarList: React.FC<CarListProp> = ({ filters, page, setTotalPages }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cars = useSelector(selectCars); // Убрали .cars
  const favorites = useSelector(selectFavorites);
  const [allCars, setAllCars] = useState<Cars[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchCars({ page, filters })).then(action => {
      const payload = action.payload as
        | { cars: Cars[]; totalPages: number }
        | undefined;
      if (payload) {
        setAllCars(prevCars =>
          page === 1 ? payload.cars : [...prevCars, ...payload.cars]
        );
        setTotalPages(payload.totalPages);
      }
      setIsLoading(false);
    });
  }, [dispatch, page, filters, setTotalPages]);

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

  if (cars.length === 0) {
    // Убрали ненужную проверку Array.isArray
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
      >
        {isLoading ? (
          <PropagateLoader color="#3470ff" size={15} />
        ) : (
          <p className={styles.infoText}>No cars found</p> // Исправил грамматическую ошибку
        )}
      </div>
    );
  }

  const handleFavoriteToggle = (carId: string) => {
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
