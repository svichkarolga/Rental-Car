import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCarById } from '../../redux/cars/operations';
import { selectCars } from '../../redux/cars/selectors';

const CarDetails = () => {
  const { carId } = useParams();
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const [car, setCar] = useState(null);

  useEffect(() => {
    dispatch(getCarById({ carId })).then(action => {
      if (action.payload) {
        setCar(action.payload);
      }
    });
  }, [dispatch, carId]);

  if (!car) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>
        {car.brand} {car.model}
      </h1>
      <img src={car.img} alt={car.brand} />
      <p>Year: {car.year}</p>
      <p>Price: ${car.rentalPrice}</p>
      <p>Mileage: {car.mileage} km</p>
      <p>Location: {car.address}</p>
      <p>Rental Company: {car.rentalCompany}</p>
    </div>
  );
};

export default CarDetails;
