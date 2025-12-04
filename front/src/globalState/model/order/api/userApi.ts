
import { baseQuery } from '@/globalState/config/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { IOrder } from '../types/orderType';

export const apiOrder = createApi({
  reducerPath: 'apiOrder',
  baseQuery: baseQuery,
  endpoints: (builder) => ({

    // getOrder: builder.query<any, {id: string}>({
    //   query: () => ({
    //     url: `users/auth`,
    //     method: 'GET',
    //   }),
    // }),

    createOrder: builder.mutation<string, Partial<IOrder>>({
      query: (body) => ({
        url: `orders`,
        method: 'POST',
        body
      }),
    }),

  }),
});

export const { useCreateOrderMutation } = apiOrder;
