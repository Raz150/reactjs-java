import { configureStore } from '@reduxjs/toolkit';
import placesReducer from './placesSlice';

export const store = configureStore({
  reducer: {
    places: placesReducer,
  },
  // Redux thunk is included by default in configureStore
});
