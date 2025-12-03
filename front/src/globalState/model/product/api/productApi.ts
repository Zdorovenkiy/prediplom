
import { baseQuery } from '@/globalState/config/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { IProduct } from '../types/productType';

export const apiProduct = createApi({
  reducerPath: 'apiProduct',
  baseQuery: baseQuery,
  endpoints: (builder) => ({

    getDiscounts: builder.query<IProduct[], void>({
      query: () => ({
        url: `products/discount`,
        method: 'GET',
      }),
    }),

    getProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: `products`,
        method: 'GET',
      }),
    }),

    
    getProduct: builder.query<IProduct, {id: number}>({
      query: (body) => ({
        url: `products/item`,
        method: 'GET',
        params: body
      }),
    }),

  }),
});

export const { useGetDiscountsQuery, useGetProductsQuery, useGetProductQuery } = apiProduct;
