"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@client-app/entities/user/model/user";

interface AuthState {
    user: User | null;
}

const AUTH_SLICE_NAME = "auth";

const initialState: AuthState = {
    user: null,
};

export const authSlice = createSlice({
    name: AUTH_SLICE_NAME,
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = authSlice.actions;
