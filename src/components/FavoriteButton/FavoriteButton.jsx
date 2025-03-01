// import styles from './FavoriteButton.module.css';

// const FavoriteButton = ({ isFavorite, onFavoriteToggle }) => {
//   return (
//     <button className={styles.favoriteBtn} onClick={onFavoriteToggle}>
//       <svg className={isFavorite ? styles.active : styles.inactive}>
//         <use href="/icons/LinkedSprite.svg#heart1"></use>
//       </svg>
//     </button>
//   );
// };

// export default FavoriteButton;

import styles from './FavoriteButton.module.css';

const FavoriteButton = ({ isFavorite, onFavoriteToggle }) => {
  return (
    <button className={styles.favoriteBtn} onClick={onFavoriteToggle}>
      <svg className={styles.icon}>
        <use
          href={
            isFavorite
              ? '/icons/LinkedSprite.svg#heart-stroke'
              : '/icons/LinkedSprite.svg#heart'
          }
        ></use>
      </svg>
    </button>
  );
};

export default FavoriteButton;
