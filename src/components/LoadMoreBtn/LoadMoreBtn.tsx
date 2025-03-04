import React from 'react';
import styles from './LoadMoreBtn.module.css';

type LoadMoreBtn = {
  onClick: () => void;
};

const LoadMoreBtn: React.FC<LoadMoreBtn> = ({ onClick }) => {
  return (
    <div className={styles.btnBox}>
      <button className={styles.loadMore} type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
