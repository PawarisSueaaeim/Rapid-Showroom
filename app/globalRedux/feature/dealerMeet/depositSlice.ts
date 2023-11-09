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

// export function getLocalStorage(key: string) {
//   if (typeof window != 'undefined' && window.sessionStorage) {
//     const data = window.sessionStorage.getItem(key);
//     return JSON.parse(data!);
//   } else {
//     return "";
//   }
// }

// export function setLocalStorage(key: string, value: unknown) {
//   if (typeof window != 'undefined' && window.sessionStorage) {
//     const data = JSON.stringify(value);
//     window.sessionStorage.setItem(key, data);
//   } else {
//     return
//   }
// }

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

// const initialState: IDeposit = getLocalStorage("deposit") || "{}";

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    setDeposit: (state, action) => {
      return { ...state, ...action.payload };
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
      // setLocalStorage("deposit", state);
    },
    setModel: (state, action) => {
      state.model = action.payload;
      // setLocalStorage("deposit", state);
    },
    setSubmodel: (state, action) => {
      state.submodel = action.payload;
      // setLocalStorage("deposit", state);
    },
    setDateDeposit: (state, action) => {
      state.date = action.payload;
      // setLocalStorage("deposit", state);
    },
    setTimeDeposit: (state, action) => {
      state.time = action.payload;
      // setLocalStorage("deposit", state);
    },
    setImage: (state, action) => {
      state.image = action.payload;
      // setLocalStorage("deposit", state);
    },
    setGuestId: (state, action) => {
      state.guest_id = action.payload;
      // setLocalStorage("deposit", state);
    },
    setVparkId: (state, action) => {
      state.vpark_id = action.payload;
      // setLocalStorage("deposit", state);
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
      // setLocalStorage("deposit", state);
    },
    setPrice: (state, action) => {
      state.price = action.payload;
      // setLocalStorage("deposit", state);
    },
    setPlateId: (state, action) => {
      state.plate_id = action.payload;
      // setLocalStorage("deposit", state);
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
