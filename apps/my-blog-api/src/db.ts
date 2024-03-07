import { MongoClient } from "mongodb";
import { UserEntity } from "./modules/api/user/user-entity";
import { PostEntity } from "./modules/api/post/post-entity";

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_NAME = process.env.DB_NAME;

const USER_COLLECTION_NAME = "user";
const POST_COLLECTION_NAME = "post";

const client = new MongoClient(DB_CONNECTION_STRING);
const blogDb = client.db(DB_NAME);

export const useUserCollection = () => {
    return blogDb.collection<UserEntity>(USER_COLLECTION_NAME);
};

export const usePostCollection = () => {
    return blogDb.collection<PostEntity>(POST_COLLECTION_NAME);
};
