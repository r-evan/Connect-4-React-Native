
import { configureStore } from '@reduxjs/toolkit';
import optionsReducer from './features/options/optionsSlice';

export const store = configureStore({
  reducer: {
    options: optionsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Types pour le RootState et AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;