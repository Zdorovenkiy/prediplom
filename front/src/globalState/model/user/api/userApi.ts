
import { baseQuery } from '@/globalState/config/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { IUser } from '../types/userType';

export const apiUser = createApi({
  reducerPath: 'apiUser',
  baseQuery: baseQuery,
  endpoints: (builder) => ({

    getUser: builder.query<IUser, {id: string}>({
      query: (body) => ({
        url: `users/${body.id}`,
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

    updateUser: builder.mutation<IUser, Partial<IUser>>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: 'PATCH',
        body
      }),
    }),

  }),
});

export const { useGetUserQuery, useLazyGetUserQuery, useAuthMutation, useRecoverMutation, useRegisterMutation, useUpdateUserMutation } = apiUser;
