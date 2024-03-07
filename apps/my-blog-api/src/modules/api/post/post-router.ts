import { Router } from "express";
import { EmptyObject } from "@api/lib/base-types";
import { ErrorResult, Result } from "@api/lib/result";
import { searchPosts, getPostById, addPost, changePost } from "./post-service";

interface SearchPostsRequest {}

interface GetPostByIdRequest {
    id: string;
}

interface AddPostRequest {
    title: string;
    coverUrl: string;
    description: string;
    categoryName: string;
}

interface ChangePostRequest {
    id: string;
    title: string;
    coverUrl: string;
    createDate: string;
    modifiedDate: string;
    description: string;
    numberOfLikes: number;
    numberOfComments: number;
    numberOfViews: number;
    categoryName: string;
}

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

export const postRouter = Router();

postRouter.post<EmptyObject, Result<PostResponse[]>, SearchPostsRequest>(
    "/search",
    async (request, response) => {
        const searchResult = await searchPosts();
        response.send({
            ok: searchResult.ok,
            payload: searchResult.payload.map((p) => ({
                ...p,
                isLiked: false,
            })),
        });
    }
);

postRouter.get<GetPostByIdRequest, Result<PostResponse>>(
    "/:postId",
    async (request, response) => {
        const postId = request.params.id;
        const getResult = await getPostById(postId);

        if (getResult.ok) {
            response.send({
                ok: getResult.ok,
                payload: {
                    ...getResult.payload,
                    isLiked: false,
                },
            });
        } else {
            response.send(getResult as ErrorResult);
        }
    }
);

postRouter.post<EmptyObject, Result<string>, AddPostRequest>(
    "/",
    async (request, response) => {
        const addResult = await addPost(request.body);
        response.send(addResult);
    }
);

postRouter.put<EmptyObject, Result<string>, ChangePostRequest>(
    "/",
    async (request, response) => {
        const changeResult = await changePost(request.body);
        response.send(changeResult);
    }
);
