import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import productReducer from '../features/productSlice';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
      product: productReducer,
      auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
