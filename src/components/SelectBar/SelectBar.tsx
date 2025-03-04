import React, { useState, useEffect, useRef } from 'react';
import styles from './SelectBar.module.css';

type SelectBarProp = {
  onSubmit: (filters: {
    brand: string;
    rentalPrice: string;
    mileageData: { minMileage: number | null; maxMileage: number | null };
  }) => void;
};

const SelectBar: React.FC<SelectBarProp> = ({ onSubmit }) => {
  const [brand, setBrand] = useState('');
  const [rentalPrice, setRentalPrice] = useState<string | ''>('');
  const [minMileage, setMinMileage] = useState<number | ''>('');
  const [maxMileage, setMaxMileage] = useState<number | ''>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const brandRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const liRef = useRef<HTMLLIElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (brandRef.current && !brandRef.current.contains(event.target as Node)) {
      setIsBrandOpen(false);
    }
    if (priceRef.current && !priceRef.current.contains(event.target as Node)) {
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

  const handleBrandSelect = (brand: string) => {
    setBrand(brand);
    setIsBrandOpen(false);
  };

  const handlePriceSelect = (price: string) => {
    setRentalPrice(price);
    setIsDropdownOpen(false);
  };

  const formatNumber = (num: number | '') => {
    if (!num) return '';
    return Number(num).toLocaleString();
  };

  const handleMileageChange =
    (setter: React.Dispatch<React.SetStateAction<number | ''>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
