import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../types/userType";
import { apiUser } from "../api/userApi";

const initialState: Partial<IUser> = {
    id: undefined,
    email: undefined,
    surname: undefined,
    name: undefined,
    password: undefined,
    patronymic: undefined,
    phone: undefined,
    role_id: undefined,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setIsAuth: (state, action: PayloadAction<boolean>) => {
    //   state.isAuth = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
        apiUser.endpoints.getUser.matchFulfilled,
        (state, { payload }) => {
            state = payload;
        },
    );

    builder.addMatcher(
        apiUser.endpoints.auth.matchFulfilled,
        (state, { payload }) => {
            state = payload;
        },
    );

    builder.addMatcher(
        apiUser.endpoints.register.matchFulfilled,
        (state, { payload }) => {
            state = payload;
        },
    );

    builder.addMatcher(
        apiUser.endpoints.recover.matchFulfilled,
        (state, { payload }) => {
            state = payload;
        },
    );
  },
});

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;
