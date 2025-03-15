import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Cars } from '../../types';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const fetchCars = createAsyncThunk<
  Cars[],
  { page: number; filters: Record<string, any> },
  { rejectValue: string }
>('cars/fetchAll', async ({ page, filters }, thunkAPI) => {
  try {
    const response = await axios.get<Cars[]>('/cars', {
      params: {
        page,
        ...filters,
      },
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(
      Error instanceof Error ? Error.message : 'Unknown mistake'
    );
  }
});

export const getCarById = createAsyncThunk<
  Cars,
  string,
  { rejectValue: string }
>('cars/getById', async (carId, thunkAPI) => {
  try {
    const response = await axios.get<Cars>(`/cars/${carId}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(
      Error instanceof Error ? Error.message : 'Unknown mistake'
    );
  }
});
