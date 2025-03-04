import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './cars/slice.js';
import favoritesReducer from './favorites/slice.js';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface PersistConfig {
  key: string;
  storage: typeof storage;
  whitelist?: string[];
}

const carsPersistConfig: PersistConfig = {
  key: 'cars',
  storage,
  whitelist: ['items'],
};
const persistedCarsReducer = persistReducer(carsPersistConfig, carsReducer);

const favoritesPersistConfig: PersistConfig = {
  key: 'favorites',
  storage,
};

const persistedFavoritesReducer = persistReducer(
  favoritesPersistConfig,
  favoritesReducer
);

export const store = configureStore({
  reducer: {
    cars: persistedCarsReducer,
    favorites: persistedFavoritesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
