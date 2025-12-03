import {
  combineReducers,
  configureStore,
  type ReducersMapObject,
} from '@reduxjs/toolkit';

import type { StateSchema } from '../types/stateSchema';
import { userReducer } from '../model/user/slice/userSlice';
import { apiUser } from '../model/user/api/userApi';
// import { matchApi } from '@/entities/match/model/api/match.api';
// import { listenerReducer } from '@/entities/listeners';
// import { timerReducer } from '@/entities/timer';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer
    // auth: authReducer,
    // listeners: listenerReducer,
    // timer: timerReducer,
  };

  const apiReducers = {
    [apiUser.reducerPath]: apiUser.reducer,
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
        apiUser.middleware
    ),
  });

  return store;
}

export type RootState = ReturnType<
  ReturnType<typeof createReduxStore>['getState']
>;
