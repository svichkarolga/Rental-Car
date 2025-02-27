import styles from './FavoriteButton.module.css';

const FavoriteButton = ({ isFavorite, onFavoriteToggle }) => {
  return (
    <button className={styles.favoriteBtn} onClick={onFavoriteToggle}>
      <svg className={isFavorite ? styles.active : styles.inactive}>
        <use href="/icons/LinkedSprite.svg#heart"></use>
      </svg>
    </button>
  );
};

export default FavoriteButton;
