import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IOrder } from "../types/orderType";
import type { IOrderProduct } from "../types/orderProductType";

const initialState: Partial<IOrder> = {
    user_id: 1,
    total: 0,
    is_payed: false,
    products: []
};


const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
setProducts: (state, action: PayloadAction<IOrderProduct>) => {
      if (!state.products) {
        state.products = [];
      }
      
      const existingProduct = state.products.find(
        product => product.product_id === action.payload.product_id
      );
      
      if (existingProduct) {
        const currentQuantity = existingProduct.quantity || 0;
        const newQuantity = action.payload.quantity || 1;
        existingProduct.quantity = currentQuantity + newQuantity;
      } else {
        const productToAdd = {
          ...action.payload,
          quantity: action.payload.quantity || 1
        };
        state.products.push(productToAdd);
      }
    },
    setTotal: (state, action: PayloadAction<number>) => {
        state.total = action.payload;

    },
    setUser: (state, action: PayloadAction<number>) => {
      state.user_id = action.payload;
    },
    setQuantity: (state, action: PayloadAction<{id: number, quantity: number}>) => {
          state.products = state.products?.map((item) => {
              if (item.product_id === action.payload.id) {
                  return { ...item, quantity: action.payload.quantity };
              }
              return item;
          });
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      if (state.products) {
        state.products = state.products.filter(
          (product) => product.product_id !== action.payload
        );
      }
    },
    removeAll: (state) => {
      if (state.products) {
        state.products = []
      }
    },
  },
});

export const orderAction = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
