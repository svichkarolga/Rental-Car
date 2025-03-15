import { RootState } from '../store';

export const selectCars = (state: RootState) => state.cars.items;
export const selectError = (state: RootState) => state.cars.error;
export const selectSelectedCar = (state: RootState) => state.cars.selectedCar;
