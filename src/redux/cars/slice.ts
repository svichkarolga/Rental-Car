import { createSlice } from '@reduxjs/toolkit';
import { fetchCars, getCarById } from './operations.js';
import { Cars } from '../../types.js';

interface CarsState {
  items: Cars[];
  isLoading: boolean;
  error: string | null;
  selectedCar: Cars | null;
}

const initialState: CarsState = {
  items: [],
  isLoading: false,
  error: null,
  selectedCar: null,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCars.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Unknown error';
      })
      .addCase(getCarById.pending, state => {
        state.error = null;
        state.selectedCar = null;
      })
      .addCase(getCarById.fulfilled, (state, action) => {
        state.selectedCar = action.payload;
      })
      .addCase(getCarById.rejected, (state, action) => {
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export default carsSlice.reducer;
