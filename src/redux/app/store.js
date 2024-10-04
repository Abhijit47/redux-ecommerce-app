import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../features/cartSlice';
import productSlice from '../features/productSlice';

export const store = configureStore({
  reducer: {
    products: productSlice,
    carts: cartSlice,
  },
  devTools: process.env.NODE_ENV !== 'development',
});
