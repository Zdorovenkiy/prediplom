import { baseQuery } from '@/globalState/config/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { IProduct } from '../../product/types/productType';
import type { IOrder } from '../../order/types/orderType';
import type { IReview } from '../../review/types/reviewType';
import type { IUser } from '../../user/types/userType';

export const apiAdmin = createApi({
  reducerPath: 'apiAdmin',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    // Dashboard статистика
    getDashboardStats: builder.query<any, void>({
      query: () => ({
        url: `admin/dashboard`,
        method: 'GET',
      }),
    }),

    // Управление товарами
    createProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query: (body) => ({
        url: `admin/products`,
        method: 'POST',
        body
      }),
    }),

    updateProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query: (body) => {
        const { id, images, ...updateData } = body;
        // Преобразуем price и stock в числа, если они есть
        const cleanData: any = { ...updateData };
        if (cleanData.price !== undefined) {
          cleanData.price = Number(cleanData.price);
        }
        if (cleanData.stock !== undefined) {
          cleanData.stock = Number(cleanData.stock);
        }
        return {
          url: `admin/products/${id}`,
          method: 'PATCH',
          body: cleanData
        };
      },
    }),

    deleteProduct: builder.mutation<void, {id: number}>({
      query: (body) => ({
        url: `admin/products/${body.id}`,
        method: 'DELETE',
      }),
    }),

    // Управление заказами
    getAllOrders: builder.query<IOrder[], void>({
      query: () => ({
        url: `admin/orders`,
        method: 'GET',
      }),
    }),

    updateOrder: builder.mutation<IOrder, Partial<IOrder>>({
      query: (body) => ({
        url: `admin/orders/${body.id}`,
        method: 'PATCH',
        body
      }),
    }),

    // Модерация отзывов
    getAllReviews: builder.query<IReview[], void>({
      query: () => ({
        url: `admin/reviews`,
        method: 'GET',
      }),
    }),

    generateAIResponse: builder.mutation<{response: string}, {reviewId: number, reviewText: string}>({
      query: (body) => ({
        url: `admin/reviews/generate-response`,
        method: 'POST',
        body
      }),
    }),

    sendReviewResponse: builder.mutation<void, {reviewId: number, responseText: string, user_id: number}>({
      query: (body) => ({
        url: `admin/reviews/${body.reviewId}/response`,
        method: 'POST',
        body: { text: body.responseText, user_id: body.user_id }
      }),
    }),

    deleteReview: builder.mutation<void, {id: number}>({
      query: (body) => ({
        url: `admin/reviews/${body.id}`,
        method: 'DELETE',
      }),
    }),

    // Управление пользователями
    getAllUsers: builder.query<IUser[], void>({
      query: () => ({
        url: `admin/users`,
        method: 'GET',
      }),
    }),

    updateUserRole: builder.mutation<IUser, {userId: number, roleId: number}>({
      query: (body) => ({
        url: `admin/users/${body.userId}/role`,
        method: 'PATCH',
        body: { role_id: body.roleId }
      }),
    }),

    deleteUser: builder.mutation<void, {id: number}>({
      query: (body) => ({
        url: `admin/users/${body.id}`,
        method: 'DELETE',
      }),
    }),

    exportData: builder.mutation<any, {type: string}>({
      query: (body) => ({
        url: `admin/export/${body.type}`,
        method: 'GET',
        responseHandler: (response) => response.blob(),
      }),
    }),

    importData: builder.mutation<void, {type: string, file: File}>({
      query: (body) => {
        const formData = new FormData();
        formData.append('file', body.file);
        return {
          url: `admin/import/${body.type}`,
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useGetAllReviewsQuery,
  useGenerateAIResponseMutation,
  useSendReviewResponseMutation,
  useDeleteReviewMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useExportDataMutation,
  useImportDataMutation,
} = apiAdmin;

