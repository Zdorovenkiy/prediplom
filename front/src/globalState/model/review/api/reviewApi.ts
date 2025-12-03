
import { baseQuery } from '@/globalState/config/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { IReview } from '../types/reviewType';

export const apiReview = createApi({
  reducerPath: 'apiReview',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    sendReview: builder.mutation<void, IReview>({
      query: (body) => ({
        url: `reviews`,
        method: 'POST',
        body
      }),
    }),

    getReview: builder.query<IReview[], {id: number, limit?: number}>({
      query: (body) => ({
        url: `reviews/product`,
        method: 'GET',
        params: body
      }),
    }),

  }),
});

export const { useGetReviewQuery, useSendReviewMutation } = apiReview;
