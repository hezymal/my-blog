import { Router } from "express";
import { Result } from "@api/lib/result";
import { identityUser, loginUser, registerUser } from "./auth-service";

interface LoginRequest {
    userName: string;
    password: string;
}

interface RegisterRequest {
    userName: string;
    password: string;
}

interface UserResponse {
    id: string;
    userName: string;
}

export const authRouter = Router();

authRouter.post<{}, Result<string>, LoginRequest>(
    "/login",
    async (request, response) => {
        const loginResult = await loginUser(request.body);
        if (loginResult.ok) {
            request.session.userId = loginResult.payload;
        }

        response.send(loginResult);
    }
);

authRouter.post<{}, Result<string>, RegisterRequest>(
    "/register",
    async (request, response) => {
        const loginResult = await registerUser(request.body);
        response.send(loginResult);
    }
);

authRouter.post<{}, Result<UserResponse>>(
    "/user",
    async (request, response) => {
        const userId = request.session.userId;
        const identityResult = await identityUser(userId);
        response.send(identityResult);
    }
);
