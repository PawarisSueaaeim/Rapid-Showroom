'use client'

import { createSlice } from "@reduxjs/toolkit";

type IVehicleDetail = {
    brand: string,
    model: string,
    model_id: number,
    submodel: string,
    sub_model_id: number,
    license_plate: string,
    color: string,
    gear_type: string,
    listing_price: string,
    mileages: number,
    year: string,
    brand_id: number,
    province: string,
    listing_vpark_id: number,
    listing_price_label: string,
    mileages_label: string
    main_image: string,
    gallery: [
        {
            url_path: string,
        }
    ]
}

const initialState: IVehicleDetail = {
    brand: "",
    model: "",
    model_id: 0,
    submodel: "",
    sub_model_id: 0,
    license_plate: "",
    color: "",
    gear_type: "",
    listing_price: "",
    mileages: 0,
    year: "",
    brand_id: 0,
    province: "",
    listing_vpark_id: 0,
    listing_price_label: "",
    mileages_label: "",
    main_image: "",
    gallery: [
        {
            url_path: ''
        }
    ]
};

const detailSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
      setVehicle: (state, action) => {
        return { ...state, ...action.payload };
      },
    },
  });
  
  export const { setVehicle } = detailSlice.actions;
  export default detailSlice.reducer;