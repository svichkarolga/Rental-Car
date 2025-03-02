import React, { useState, useEffect, useRef } from 'react';
import styles from './SelectBar.module.css';

const SelectBar = ({ onSubmit, value }) => {
  const [brand, setBrand] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const brandRef = useRef(null);
  const priceRef = useRef(null);

  const handleClickOutside = event => {
    if (brandRef.current && !brandRef.current.contains(event.target)) {
      setIsBrandOpen(false);
    }
    if (priceRef.current && !priceRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const brands = [
    'Aston Martin',
    'Audi',
    'BMW',
    'Bentley',
    'Buick',
    'Chevrolet',
    'Chrysler',
    'GMC',
    'HUMMER',
  ];

  const prices = ['30', '40', '50', '60', '70', '80'];

  const handleBrandSelect = brand => {
    setBrand(brand);
    setIsBrandOpen(false);
  };

  const handlePriceSelect = price => {
    setRentalPrice(price);
    setIsDropdownOpen(false);
  };

  const formatNumber = num => {
    if (!num) return '';
    return Number(num).toLocaleString();
  };

  const handleMileageChange = setter => e => {
    const value = e.target.value.replace(/\D/g, '');
    setter(value ? Number(value) : '');
  };

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
    onSubmit({ brand, rentalPrice, mileageData });
    resetFilters();
  };

  return (
    <div className={styles.thumb}>
      <form onSubmit={handleSubmit}>
        <div className={styles.box}>
          <label>Car brand</label>
          <div
            className={styles.customSelect}
            onClick={() => setIsBrandOpen(!isBrandOpen)}
            ref={brandRef}
          >
            {brand || 'Choose a brand'}
            <svg className={styles.arrowIcon}>
              <use href="/icons/LinkedSprite.svg#arrow-down"></use>
            </svg>
          </div>

          {isBrandOpen && (
            <ul className={styles.dropdownMenu}>
              {brands.map(b => (
                <li
                  key={b}
                  onClick={() => handleBrandSelect(b)}
                  ref={priceRef}
                  className={styles.dropdownItem}
                >
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.box} ref={priceRef}>
          <label>Price/ 1 hour</label>
          <div
            className={styles.customSelect}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {rentalPrice ? `To $${rentalPrice}` : 'Choose a price'}
            <svg className={styles.arrowIcon}>
              <use href="/icons/LinkedSprite.svg#arrow-down"></use>
            </svg>
          </div>

          {isDropdownOpen && (
            <ul className={styles.dropdownMenu}>
              {prices.map(price => (
                <li
                  key={price}
                  onClick={() => handlePriceSelect(price)}
                  className={styles.dropdownItem}
                >
                  {price}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.box}>
          <label>Сar mileage / km</label>
          <div className={styles.mileageWrapper}>
            <input
              className={styles.MileAge}
              type="text"
              value={minMileage ? `From ${formatNumber(minMileage)}` : ''}
              onChange={handleMileageChange(setMinMileage)}
              placeholder="From"
            />
            <input
              className={styles.MileAge}
              type="text"
              value={maxMileage ? `To ${formatNumber(maxMileage)}` : ''}
              onChange={handleMileageChange(setMaxMileage)}
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
