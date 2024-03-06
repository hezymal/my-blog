"use client";

import * as api from "../api/auth";

export const loginUser = async (request: api.LoginUserRequest) => {
    const response = await api.loginUser(request);
    return response;
};

export const registerUser = async (request: api.RegisterUserRequest) => {
    await api.registerUser(request);
};

export const resetUserPassword = async (
    request: api.ResetUserPasswordRequest
) => {
    await api.resetUserPassword(request);
};

export const getAuthUser = async () => {
    const response = await api.getAuthUser();
    return response;
};

export const changeAuthUser = async (request: api.ChangeAuthUserRequest) => {
    await api.changeAuthUser(request);
};
