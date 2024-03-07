"use client";

import * as http from "@client-app/shared/lib/http";
import { Result } from "@client-app/shared/lib/result";
import { User } from "@client-app/entities/user/model/user";

interface LoginUserRequest {
    userName: string;
    password: string;
}

interface RegisterUserRequest {
    userName: string;
    password: string;
}

export const registerUser = (request: RegisterUserRequest) => {
    return http.request.post<Result<string>, LoginUserRequest>(
        "/api/auth/register",
        request
    );
};

export const loginUser = (request: LoginUserRequest) => {
    return http.request.post<Result<string>, LoginUserRequest>(
        "/api/auth/login",
        request
    );
};

export const logoutUser = () => {
    return http.request.delete<Result<string>>("/api/auth/logout");
};

export const getAuthUser = () => {
    return http.request.get<Result<User>>("/api/auth/user");
};
