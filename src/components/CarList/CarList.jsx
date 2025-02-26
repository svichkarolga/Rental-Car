import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/cars/operations.js';
import { selectCars } from '../../redux/cars/selectors.js';

const CarList = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);
  return (
    <div>
      {' '}
      {cars.length > 0 ? (
        cars.map(car => <div key={car.id}>{car.name}</div>)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CarList;
