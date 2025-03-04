import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const fetchCars = createAsyncThunk(
  'cars/fetchAll',
  async (
    { page, filters }: { page: number; filters: Record<string, any> },
    thunkAPI
  ) => {
    try {
      const response = await axios.get('/cars', {
        params: {
          page,
          ...filters,
        },
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

export const getCarById = createAsyncThunk(
  'cars/getById',
  async (carId: string, thunkAPI) => {
    try {
      const response = await axios.get(`/cars/${carId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);
