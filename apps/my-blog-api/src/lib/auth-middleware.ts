import { RequestHandler } from "express";

export const authMiddleware: RequestHandler = (request, response, next) => {
    if (request.session.userId) {
        next();
    }
};
