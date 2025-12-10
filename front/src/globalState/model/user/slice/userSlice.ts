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
    clearUser: () => {
        const cleared = {
            id: undefined,
            email: undefined,
            surname: undefined,
            name: undefined,
            password: undefined,
            patronymic: undefined,
            phone: undefined,
            role_id: undefined,
        };

        return { ...cleared };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
        apiUser.endpoints.getUser.matchFulfilled,
        (state, { payload }) => {
            console.log("payload", payload);
            return { ...state, ...payload };
        },
    );

    builder.addMatcher(
        apiUser.endpoints.auth.matchFulfilled,
        (state, { payload }) => {
            return { ...state, ...payload };
        },
    );

    builder.addMatcher(
        apiUser.endpoints.register.matchFulfilled,
        (state, { payload }) => {
            return { ...state, ...payload };
        },
    );

    builder.addMatcher(
        apiUser.endpoints.recover.matchFulfilled,
        (state, { payload }) => {
            return { ...state, ...payload };
        },
    );

    builder.addMatcher(
        apiUser.endpoints.updateUser.matchFulfilled,
        (state, { payload }) => {
            return { ...state, ...payload };
        },
    );
  },
});

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;
