import { ObjectId, WithId } from "mongodb";
import { PostEntity } from "./post-entity";
import { usePostCollection } from "../../../db";
import { result } from "../../../lib/result";

export interface PostDto {
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

export interface PostCreationDto {
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

export interface PostChangesDto {
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

const mapPostEntityToDto = (postEntity: WithId<PostEntity>): PostDto => {
    return {
        id: postEntity._id.toHexString(),
        title: postEntity.title,
        coverUrl: postEntity.coverUrl,
        createDate: postEntity.createDate,
        modifiedDate: postEntity.modifiedDate,
        description: postEntity.description,
        isLiked: postEntity.isLiked,
        numberOfLikes: postEntity.numberOfLikes,
        numberOfComments: postEntity.numberOfComments,
        numberOfViews: postEntity.numberOfViews,
        categoryName: postEntity.categoryName,
    };
};

export const createPost = async (postCreationDto: PostCreationDto) => {
    const postCollection = usePostCollection();
    const postEntity: PostEntity = postCreationDto;
    const insertResult = await postCollection.insertOne(postEntity);
    const postId = insertResult.insertedId.toString();
    return result.ok(postId);
};

export const changePost = async (postChangesDto: PostChangesDto) => {
    const postCollection = usePostCollection();
    const updateResult = await postCollection.updateOne(
        { _id: new ObjectId(postChangesDto.id) },
        {
            title: postChangesDto.title,
            coverUrl: postChangesDto.coverUrl,
            createDate: postChangesDto.createDate,
            modifiedDate: postChangesDto.modifiedDate,
            description: postChangesDto.description,
            isLiked: postChangesDto.isLiked,
            numberOfLikes: postChangesDto.numberOfLikes,
            numberOfComments: postChangesDto.numberOfComments,
            numberOfViews: postChangesDto.numberOfViews,
            categoryName: postChangesDto.categoryName,
        }
    );
    const postId = updateResult.upsertedId.toString();
    return result.ok(postId);
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

export const searchPosts = async () => {
    const postCollection = usePostCollection();
    const posts = await postCollection.find<WithId<PostEntity>>({}).toArray();
    return result.ok(posts.map(mapPostEntityToDto));
};
