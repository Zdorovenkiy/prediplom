
import { baseQuery } from '@/globalState/config/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { IUser } from '../types/userType';

export const apiUser = createApi({
  reducerPath: 'apiUser',
  baseQuery: baseQuery,
  endpoints: (builder) => ({

    getUser: builder.query<any, {id: string}>({
      query: () => ({
        url: `users/auth`,
        method: 'GET',
      }),
    }),

    auth: builder.mutation<IUser, IUser>({
      query: (body) => ({
        url: `users/auth`,
        method: 'POST',
        body
      }),
    }),

    register: builder.mutation<IUser, IUser>({
      query: (body) => ({
        url: `users/register`,
        method: 'POST',
        body
      }),
    }),

    recover: builder.mutation<any, {email: string}>({
      query: (body) => ({
        url: `users/recover`,
        method: 'POST',
        body
      }),
    }),

  }),
});

export const { useGetUserQuery, useAuthMutation, useRecoverMutation, useRegisterMutation } = apiUser;
