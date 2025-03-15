import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { RootState } from '../store';

const favoritesPersistConfig = {
  key: 'favorites',
  storage,
};

const initialState = {
  favorites: [] as string[],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const carId = action.payload;
      if (state.favorites.includes(carId)) {
        state.favorites = state.favorites.filter(id => id !== carId);
      } else {
        state.favorites.push(carId);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default persistReducer(favoritesPersistConfig, favoritesSlice.reducer);
