import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Header.module.css';

const buildLinkClass = ({ isActive }: { isActive: boolean }) => {
  return clsx(styles.link, isActive && styles.active);
};
const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <NavLink to="/" className={buildLinkClass}>
          <img src="/logo/Logo.svg" alt="Logo" />
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
