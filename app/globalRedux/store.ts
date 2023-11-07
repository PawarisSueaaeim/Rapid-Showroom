"use client"
import {configureStore} from '@reduxjs/toolkit';
import detailReducer from './feature/vehicles/detailSlice';
import depositReducer from './feature/dealerMeet/depositSlice';

export const store = configureStore({
    reducer: {
        vehicle: detailReducer,
        deposit: depositReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;