"use client";

import { redirect } from "next/navigation";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@/entities/user/model/user";
import { getAuthUser } from "../actions/auth";

interface AuthState {
    user: User | null;
}

const AUTH_SLICE_NAME = "auth";

const initialState: AuthState = {
    user: null,
};

export const fetchAuthUser = createAsyncThunk(
    `${AUTH_SLICE_NAME}/fetchAuthUser`,
    async () => {
        const user = await getAuthUser();
        if (!user) {
            redirect("/login");
        }

        return user;
    }
);

export const authSlice = createSlice({
    name: AUTH_SLICE_NAME,
    initialState,
    reducers: {
        removeUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuthUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    },
});

export const { removeUser } = authSlice.actions;
