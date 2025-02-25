import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Header.module.css';
import HomePage from '../../pages/HomePage/HomePage';
import CatalogPage from '../../pages/Catalog/Catalog';
import CarPage from '../../pages/CarDetails/CarDetails';

const buildLinkClass = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);
};
const Header = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <NavLink to="/" className={buildLinkClass}>
          <img src="/public/logo/Logo.svg" alt="Logo" />
        </NavLink>
        <div className={styles.box}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/Catalog" className={buildLinkClass}>
            Catalog
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Header;
