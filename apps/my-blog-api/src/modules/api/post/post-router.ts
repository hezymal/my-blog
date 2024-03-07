import { Router } from "express";
import { EmptyObject } from "@api//lib/base-types";
import { Result } from "@api//lib/result";
import {
    changePost,
    createPost,
    getPostById,
    searchPosts,
} from "./post-service";

interface PostResponse {
    id: string;
    title: string;
    coverUrl: string;
    createDate: string;
    modifiedDate: string;
    description: string;
    isLiked: boolean;
    numberOfLikes: number;
    numberOfComments: number;
    numberOfViews: number;
    categoryName: string;
}

interface SearchPostsRequest {}

interface PostCreationRequest {
    title: string;
    coverUrl: string;
    createDate: string;
    modifiedDate: string;
    description: string;
    isLiked: boolean;
    numberOfLikes: number;
    numberOfComments: number;
    numberOfViews: number;
    categoryName: string;
}

interface PostChangesRequest {
    id: string;
    title: string;
    coverUrl: string;
    createDate: string;
    modifiedDate: string;
    description: string;
    isLiked: boolean;
    numberOfLikes: number;
    numberOfComments: number;
    numberOfViews: number;
    categoryName: string;
}

export const postRouter = Router();

postRouter.post<EmptyObject, Result<PostResponse[]>, SearchPostsRequest>(
    "/search",
    async (request, response) => {
        const searchResult = await searchPosts();
        response.send(searchResult);
    }
);

postRouter.post<EmptyObject, Result<string>, PostCreationRequest>(
    "/",
    async (request, response) => {
        const createResult = await createPost(request.body);
        response.send(createResult);
    }
);

postRouter.get<{ postId: string }, Result<PostResponse>>(
    "/:postId",
    async (request, response) => {
        const postId = request.params.postId;
        const getResult = await getPostById(postId);
        response.send(getResult);
    }
);

postRouter.get("/", (request, response) => {
    response.send({ hello: "world" });
});

postRouter.put<EmptyObject, Result<string>, PostChangesRequest>(
    "/",
    async (request, response) => {
        const changeResult = await changePost(request.body);
        response.send(changeResult);
    }
);
