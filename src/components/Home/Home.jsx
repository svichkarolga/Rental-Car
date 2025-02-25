import React from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/catalog');
  };
  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <h1 className={styles.title}>Find your perfect rental car</h1>
        <p className={styles.text}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <button
          className={styles.button}
          onClick={handleNavigate}
          type="button"
        >
          View Catalog
        </button>
      </div>
    </div>
  );
};

export default Home;
