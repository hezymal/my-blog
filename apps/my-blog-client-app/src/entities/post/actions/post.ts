"use client";

import { PostCategory } from "@client-app/entities/post/model/post";
import * as http from "@client-app/shared/lib/http";
import { sleep } from "@client-app/shared/lib/promise";
import { Result } from "@client-app/shared/lib/result";

interface SearchPostsRequest {
    category: string | null;
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
    id: number;
    title: string;
    coverUrl: string;
    createDate: string;
    modifiedDate: string | null;
    description: string;
    isLiked: boolean;
    numberOfLikes: number;
    numberOfComments: number;
    numberOfViews: number;
    categoryName: string;
}

const postsCategories: PostCategory[] = [
    {
        name: "gta",
        title: "Grand Theft Auto",
    },
    {
        name: "elden-ring",
        title: "Elden Ring",
    },
    {
        name: "total-war",
        title: "Total War",
    },
];

export const searchPosts = async (request: SearchPostsRequest) => {
    return http.request.post<Result<PostResponse[]>, SearchPostsRequest>(
        "/api/posts/search",
        request
    );
};

export const getPostById = async (id: string) => {
    return http.request.get<Result<PostResponse>>(`/api/posts/${id}`);
};

export const addPost = (request: AddPostRequest) => {
    return http.request.post<Result<string>, AddPostRequest>(
        "/api/posts",
        request
    );
};

export const changePost = (request: ChangePostRequest) => {
    return http.request.put<Result<string>, AddPostRequest>(
        "/api/posts",
        request
    );
};

export const fetchPostsCategories = async () => {
    await sleep(100);
    return postsCategories;
};
