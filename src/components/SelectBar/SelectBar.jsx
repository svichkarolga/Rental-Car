import React, { useState, useEffect } from 'react';
import styles from './SelectBar.module.css';

const SelectBar = ({ onSubmit, value }) => {
  const [brand, setBrand] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');

  const mileageData = {
    minMileage: minMileage || null,
    maxMileage: maxMileage || null,
  };

  const resetFilters = () => {
    setBrand('');
    setRentalPrice('');
    setMinMileage('');
    setMaxMileage('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    resetFilters();
    onSubmit({ brand, rentalPrice, mileageData });
  };

  return (
    <div className={styles.thumb}>
      <form onSubmit={handleSubmit}>
        <div className={styles.box}>
          <label htmlFor="brand">Car brand</label>
          <div className={styles.selectWrapper}>
            <select
              className={styles.selectBrand}
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
            <svg className={styles.arrowIcon}>
              <use href="/icons/LinkedSprite.svg#arrow-down"></use>
            </svg>
          </div>
        </div>

        <div className={styles.box}>
          <label htmlFor="rentalPrice">Price/ 1 hour</label>
          <div className={styles.selectWrapper}>
            <select
              className={styles.selectPrice}
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
            <svg className={styles.arrowIcon}>
              <use href="/icons/LinkedSprite.svg#arrow-down"></use>
            </svg>
          </div>
        </div>

        <div className={styles.box}>
          <label htmlFor="minMileage">Сar mileage / km</label>
          <div className={styles.mileageWrapper}>
            <input
              className={styles.MileAge}
              id="minMileage"
              type="number"
              value={minMileage}
              onChange={e => setMinMileage(e.target.value)}
              placeholder="From"
            />
            <input
              className={styles.MileAge}
              id="maxMileage"
              type="number"
              value={maxMileage}
              onChange={e => setMaxMileage(e.target.value)}
              placeholder="To"
            />
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.button} type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SelectBar;
