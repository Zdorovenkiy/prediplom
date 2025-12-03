import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "../types/productType";

const initialState: Partial<IProduct[]> = [];


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // setIsAuth: (state, action: PayloadAction<boolean>) => {
    //   state.isAuth = action.payload;
    // },
  },
  extraReducers: (builder) => {
    // builder.addMatcher(
    //     apiUser.endpoints.getDiscounts.matchFulfilled,
    //     (state, { payload }) => {
    //         state = payload;
    //     },
    // );
  },
});

export const productAction = productSlice.actions;
export const productReducer = productSlice.reducer;
