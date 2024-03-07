import { RequestHandler } from "express";

export const logMiddleware: RequestHandler = (request, response, next) => {
    console.log("[ request ]", request.method, request.url);
    next();
};
