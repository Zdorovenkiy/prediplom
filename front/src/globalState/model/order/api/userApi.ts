
import { baseQuery } from '@/globalState/config/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { IOrder } from '../types/orderType';

export const apiOrder = createApi({
  reducerPath: 'apiOrder',
  baseQuery: baseQuery,
  endpoints: (builder) => ({

    getOrders: builder.query<IOrder[], {userId: number}>({
      query: (body) => ({
        url: `orders/user/${body.userId}`,
        method: 'GET',
      }),
    }),

    getOrder: builder.query<IOrder, {id: number}>({
      query: (body) => ({
        url: `orders/${body.id}`,
        method: 'GET',
      }),
    }),

    createOrder: builder.mutation<string, Partial<IOrder>>({
      query: (body) => ({
        url: `orders`,
        method: 'POST',
        body
      }),
    }),

  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery, useGetOrderQuery } = apiOrder;
