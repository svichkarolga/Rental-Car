import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/cars/operations.js';
import { selectCars } from '../../redux/cars/selectors.js';
import CarItem from '../CarItem/CarItem.jsx';

const CarList = () => {
  const dispatch = useDispatch();
  const carsData = useSelector(selectCars);
  const cars = carsData?.cars || [];

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (!Array.isArray(cars) || cars.length === 0) {
    return <p>Loading...</p>;
  }

  const handleCardClick = car => {
    console.log('Clicked car:', car);
    // Здесь можно реализовать открытие модального окна с детальной информацией
  };

  return (
    <div>
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            <CarItem car={car} onCardClick={() => handleCardClick(car)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
