
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

    updateReview: builder.mutation<void, IReview>({
      query: (body) => ({
        url: `reviews/${body.id}`,
        method: 'PATCH',
        body
      }),
    }),

    deleteReview: builder.mutation<void, {id: number}>({
      query: (body) => ({
        url: `reviews/${body.id}`,
        method: 'DELETE',
      }),
    }),

    getReview: builder.query<IReview[], {id: number, limit?: number}>({
      query: (body) => ({
        url: `reviews/product`,
        method: 'GET',
        params: body
      }),
    }),

    getUserReviews: builder.query<IReview[], {userId: number}>({
      query: (body) => ({
        url: `reviews/user/${body.userId}`,
        method: 'GET',
      }),
    }),

  }),
});

export const { useGetReviewQuery, useSendReviewMutation, useGetUserReviewsQuery, useUpdateReviewMutation, useDeleteReviewMutation } = apiReview;
