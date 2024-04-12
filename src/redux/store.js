import { configureStore } from '@reduxjs/toolkit';
import { mainStateReducer } from './appSlice';

export const store = configureStore({
  reducer: {
    appState: mainStateReducer,
  },
});
