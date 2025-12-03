
import { baseQuery } from '@/globalState/config/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { IFeedback } from '../types/feedbackType';

export const apiFeedback = createApi({
  reducerPath: 'apiFeedback',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    sendFeedback: builder.mutation<void, IFeedback>({
      query: (body) => ({
        url: `feedback`,
        method: 'POST',
        body
      }),
    }),

    getFeedback: builder.query<IFeedback, IFeedback>({
      query: () => ({
        url: `feedback`,
        method: 'GET',
      }),
    }),

  }),
});

export const { useSendFeedbackMutation, useGetFeedbackQuery} = apiFeedback;
