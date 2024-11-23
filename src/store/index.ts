import { configureStore } from '@reduxjs/toolkit';

import companiesReducer from '../slices';

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
  },
  devTools: true,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
