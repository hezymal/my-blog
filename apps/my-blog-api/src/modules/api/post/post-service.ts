import { ObjectId, WithId } from "mongodb";
import { usePostCollection } from "@api/db";
import { result } from "@api/lib/result";
import { PostEntity } from "./post-entity";

export interface PostDto {
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

export interface AddPostDto {
    title: string;
    coverUrl: string;
    description: string;
    categoryName: string;
}

export interface ChangePostDto {
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

export const searchPosts = async () => {
    const postCollection = usePostCollection();
    const posts = await postCollection.find<WithId<PostEntity>>({}).toArray();
    return result.ok(posts.map(mapPostEntityToDto));
};

export const getPostById = async (postId: string) => {
    const postCollection = usePostCollection();
    const postEntity = await postCollection.findOne<WithId<PostEntity>>({
        _id: new ObjectId(postId),
    });
    if (!postEntity) {
        return result.error.NotFound;
    }

    return result.ok(mapPostEntityToDto(postEntity));
};

export const addPost = async (postDto: AddPostDto) => {
    const postCollection = usePostCollection();
    const postEntity: PostEntity = {
        title: postDto.title,
        coverUrl: postDto.coverUrl,
        createDate: new Date().toISOString(),
        modifiedDate: null,
        description: postDto.description,
        numberOfLikes: 0,
        numberOfComments: 0,
        numberOfViews: 0,
        categoryName: postDto.categoryName,
    };
    const insertResult = await postCollection.insertOne(postEntity);
    const postId = insertResult.insertedId.toString();
    return result.ok(postId);
};

export const changePost = async (postChangesDto: ChangePostDto) => {
    const postCollection = usePostCollection();
    const updateResult = await postCollection.updateOne(
        { _id: new ObjectId(postChangesDto.id) },
        {
            title: postChangesDto.title,
            coverUrl: postChangesDto.coverUrl,
            createDate: postChangesDto.createDate,
            modifiedDate: postChangesDto.modifiedDate,
            description: postChangesDto.description,
            numberOfLikes: postChangesDto.numberOfLikes,
            numberOfComments: postChangesDto.numberOfComments,
            numberOfViews: postChangesDto.numberOfViews,
            categoryName: postChangesDto.categoryName,
        }
    );
    const postId = updateResult.upsertedId.toString();
    return result.ok(postId);
};

const mapPostEntityToDto = (postEntity: WithId<PostEntity>): PostDto => {
    return {
        id: postEntity._id.toHexString(),
        title: postEntity.title,
        coverUrl: postEntity.coverUrl,
        createDate: postEntity.createDate,
        modifiedDate: postEntity.modifiedDate,
        description: postEntity.description,
        numberOfLikes: postEntity.numberOfLikes,
        numberOfComments: postEntity.numberOfComments,
        numberOfViews: postEntity.numberOfViews,
        categoryName: postEntity.categoryName,
    };
};
