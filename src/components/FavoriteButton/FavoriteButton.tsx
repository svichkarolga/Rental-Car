import styles from './FavoriteButton.module.css';

type FavoriteButtonProp = {
  carId: string;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
};

const FavoriteButton: React.FC<FavoriteButtonProp> = ({
  isFavorite,
  onFavoriteToggle,
}) => {
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
