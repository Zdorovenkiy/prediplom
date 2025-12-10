import {
  combineReducers,
  configureStore,
  type ReducersMapObject,
} from '@reduxjs/toolkit';

import type { StateSchema } from '../types/stateSchema';
import { userReducer } from '../model/user/slice/userSlice';
import { apiUser } from '../model/user/api/userApi';
import { apiNewsImages } from '../model/newsImages/api/newsImagesApi';
import { apiFeedback } from '../model/feedback/api/feedbackApi';
import { productReducer } from '../model/product/slice/userSlice';
import { apiProduct } from '../model/product/api/productApi';
import { apiReview } from '../model/review/api/reviewApi';
import { orderReducer } from '../model/order/slice/orderSlice';
import { apiOrder } from '../model/order/api/userApi';
import { apiAdmin } from '../model/admin/api/adminApi';
// import { matchApi } from '@/entities/match/model/api/match.api';
// import { listenerReducer } from '@/entities/listeners';
// import { timerReducer } from '@/entities/timer';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    product: productReducer,
    order: orderReducer
    // auth: authReducer,
    // listeners: listenerReducer,
    // timer: timerReducer,
  };

  const apiReducers = {
    [apiUser.reducerPath]: apiUser.reducer,
    [apiNewsImages.reducerPath]: apiNewsImages.reducer,
    [apiFeedback.reducerPath]: apiFeedback.reducer,
    [apiProduct.reducerPath]: apiProduct.reducer,
    [apiReview.reducerPath]: apiReview.reducer,
    [apiOrder.reducerPath]: apiOrder.reducer,
    [apiAdmin.reducerPath]: apiAdmin.reducer,
  };

  const combinedReducers = combineReducers({
    ...rootReducers,
    ...apiReducers,
  });

  const store = configureStore({
    reducer: combinedReducers,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        apiUser.middleware,
        apiNewsImages.middleware,
        apiFeedback.middleware,
        apiProduct.middleware,
        apiReview.middleware,
        apiOrder.middleware,
        apiAdmin.middleware
    ),
  });

  return store;
}

export type RootState = ReturnType<
  ReturnType<typeof createReduxStore>['getState']
>;
