import counterReducer from './cartSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        cart: counterReducer
    }
})

export type RootState = ReturnType<typeof store.getState>