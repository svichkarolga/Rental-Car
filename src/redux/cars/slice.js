import { createSlice } from '@reduxjs/toolkit';
import { fetchCars, getCarById } from './operations.js';

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
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
        state.error = action.payload;
      })
      .addCase(getCarById.pending, state => {
        state.error = null;
        state.selectedCar = null;
      })
      .addCase(getCarById.fulfilled, (state, action) => {
        state.selectedCar = action.payload;
      })
      .addCase(getCarById.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default carsSlice.reducer;
