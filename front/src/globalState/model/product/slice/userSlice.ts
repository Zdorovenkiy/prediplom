import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "../types/productType";

const initialState: Partial<IProduct[]> = [];


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

  },
});

export const productAction = productSlice.actions;
export const productReducer = productSlice.reducer;
