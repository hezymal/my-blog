import { Router } from "express";
import { EmptyObject } from "@api/lib/base-types";
import { Result, result } from "@api/lib/result";
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

authRouter.post<EmptyObject, Result<string>, RegisterRequest>(
    "/register",
    async (request, response) => {
        const registerResult = await registerUser(request.body);
        response.send(registerResult);
    }
);

authRouter.post<EmptyObject, Result<string>, LoginRequest>(
    "/login",
    async (request, response) => {
        const loginResult = await loginUser(request.body);
        if (loginResult.ok) {
            request.session.userId = loginResult.payload;
        }

        response.send(loginResult);
    }
);

authRouter.delete<EmptyObject, Result<string>, RegisterRequest>(
    "/logout",
    async (request, response) => {
        const userId = request.session.userId;
        if (!userId) {
            response.send(result.error.NotFound);
            return;
        }

        request.session.userId = null;
        response.send(result.ok(userId));
    }
);

authRouter.get<EmptyObject, Result<UserResponse>>(
    "/user",
    async (request, response) => {
        const userId = request.session.userId;
        if (!userId) {
            response.send(result.error.NotFound);
            return;
        }

        const identityResult = await identityUser(userId);
        response.send(identityResult);
    }
);
