"use server";

import { User } from "@client-app/entities/user/model/user";
import { sleep } from "@client-app/shared/lib/promise";

export interface LoginUserRequest {
    userName: string;
    password: string;
}

export interface RegisterUserRequest {
    userName: string;
    password: string;
}

export interface ResetUserPasswordRequest {
    email: string;
}

export type GetAuthUserResponse = User | null;

export interface ChangeAuthUserRequest {
    userName: string;
}

export const loginUser = async (request: LoginUserRequest) => {
    console.log("user logged to the backend:", request);
    await sleep(100);
};

export const registerUser = async (request: RegisterUserRequest) => {
    console.log("user registered in the backend:", request);
    await sleep(100);
};

export const resetUserPassword = async (request: ResetUserPasswordRequest) => {
    console.log("reset user password in the backend:", request);
    await sleep(100);
};

export const getAuthUser = async (): Promise<GetAuthUserResponse> => {
    console.log("get auth user from the backend");
    await sleep(100);
    return { userName: "batman" };
};

export const changeAuthUser = async (request: ChangeAuthUserRequest) => {
    console.log("change auth user in the backend", request);
    await sleep(100);
};
