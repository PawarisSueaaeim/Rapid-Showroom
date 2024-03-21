"use client";

import { createSlice } from "@reduxjs/toolkit";

type IDeposit = {
  brand: string;
  model: string;
  submodel: string;
  date: string;
  time: string;
  image: string;
  guest_id: string;
  vpark_id: string;
  amount: number;
  price: number;
  plate_id: string;
};

const initialState: IDeposit = {
  brand: "",
  model: "",
  submodel: "",
  date: "",
  time: "",
  image: "",
  guest_id: "",
  vpark_id: "",
  amount: 0,
  price: 0,
  plate_id: "",
};

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    setDeposit: (state, action) => {
      return { ...state, ...action.payload };
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setModel: (state, action) => {
      state.model = action.payload;
    },
    setSubmodel: (state, action) => {
      state.submodel = action.payload;
    },
    setDateDeposit: (state, action) => {
      state.date = action.payload;
    },
    setTimeDeposit: (state, action) => {
      state.time = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setGuestId: (state, action) => {
      state.guest_id = action.payload;
    },
    setVparkId: (state, action) => {
      state.vpark_id = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setPlateId: (state, action) => {
      state.plate_id = action.payload;
    },
  },
});

export const {
  setDeposit,
  setBrand,
  setModel,
  setSubmodel,
  setDateDeposit,
  setTimeDeposit,
  setImage,
  setGuestId,
  setVparkId,
  setAmount,
  setPrice,
  setPlateId,
} = depositSlice.actions;
export default depositSlice.reducer;
