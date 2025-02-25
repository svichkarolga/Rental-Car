import React, { useState, useEffect } from 'react';
import styles from './SelectBar.module.css';

const SelectBar = ({ onSubmit, value }) => {
  const [brand, setBrand] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');
  const [favorites, setFavorites] = useState([]);

  const mileageData = {
    minMileage: minMileage || null,
    maxMileage: maxMileage || null,
  };

  // Завантаження збережених обраних автомобілів з localStorage при завантаженні компонента
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Збереження обраних автомобілів у localStorage при їх зміні
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = () => {
    const car = {
      brand,
      rentalPrice,
      mileageData: {
        minMileage: minMileage ? Number(minMileage).toLocaleString() : null,
        maxMileage: maxMileage ? Number(maxMileage).toLocaleString() : null,
      },
    };

    setFavorites(prevFavorites => [...prevFavorites, car]);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ brand, rentalPrice, mileageData });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="brand">Car brand</label>
          <select
            id="brand"
            name="brand"
            value={brand}
            onChange={e => setBrand(e.target.value)}
          >
            <option value="" disabled>
              Choose a brand
            </option>
            <option value="Aston Martin">Aston Martin</option>
            <option value="Audi">Audi</option>
            <option value="BMW">BMW</option>
            <option value="Bentley">Bentley</option>
            <option value="Buick">Buick</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Chrysler">Chrysler</option>
            <option value="GMC">GMC</option>
            <option value="HUMMER">HUMMER</option>
          </select>
        </div>

        <div>
          <label htmlFor="rentalPrice">Price/ 1 hour</label>
          <select
            id="rentalPrice"
            name="rentalPrice"
            value={rentalPrice}
            onChange={e => setRentalPrice(e.target.value)}
          >
            <option value="" disabled>
              Choose a price
            </option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
            <option value="80">80</option>
          </select>
        </div>

        <div>
          <label htmlFor="minMileage">Сar mileage / km</label>
          <input
            id="minMileage"
            type="number"
            value={minMileage}
            onChange={e => setMinMileage(e.target.value)}
            placeholder="From"
          />
        </div>
        <div>
          <input
            id="maxMileage"
            type="number"
            value={maxMileage}
            onChange={e => setMaxMileage(e.target.value)}
            placeholder="To"
          />
        </div>

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SelectBar;
