import { ReactComponent as HeartIcon } from '/public/icons/LinkedSprite.svg';
import styles from './FavoriteButton.module.css';

const FavoriteButton = ({ isFavorite, onToggle }) => {
  return (
    <button className={styles.favoriteBtn} onClick={onToggle}>
      <HeartIcon className={isFavorite ? styles.active : styles.inactive} />
    </button>
  );
};

export default FavoriteButton;
