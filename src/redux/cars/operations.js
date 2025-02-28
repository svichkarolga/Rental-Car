import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const fetchCars = createAsyncThunk(
  'cars/fetchAll',
  async ({ page, filters }, thunkAPI) => {
    try {
      const response = await axios.get('/cars', {
        params: {
          page,
          ...filters,
        },
      });

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getCarById = createAsyncThunk(
  'cars/getById',
  async ({ carId }, thunkAPI) => {
    try {
      const response = await axios.get('/cars', `${carId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
