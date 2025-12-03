
import { baseQuery } from '@/globalState/config/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

export const apiNewsImages = createApi({
  reducerPath: 'apiNewsImages',
  baseQuery: baseQuery,
  endpoints: (builder) => ({

    getNewsImages: builder.query<any, void>({
      query: () => ({
        url: `news-images`,
        method: 'GET',
      }),
    }),

    setNewsImages: builder.mutation<void, {name: string, image: string}>({
      query: (body) => ({
        url: `news-images`,
        method: 'POST',
        body
      }),
    }),

  }),
});

export const { useGetNewsImagesQuery, useSetNewsImagesMutation } = apiNewsImages;
