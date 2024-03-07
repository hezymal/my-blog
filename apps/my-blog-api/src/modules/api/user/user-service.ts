import { ObjectId, WithId } from "mongodb";
import { useUserCollection } from "@api/db";
import { UserEntity } from "./user-entity";

export interface UserDto {
    id: string;
    userName: string;
}

export interface UserCreationDto {
    userName: string;
    password: string;
}

export interface UserChangesDto {
    id: string;
    userName: string;
}

const mapUserEntityToDto = (userEntity: WithId<UserEntity>): UserDto => {
    return {
        id: userEntity._id.toString(),
        userName: userEntity.userName,
    };
};

export const createUser = async (
    userCreationDto: UserCreationDto
): Promise<string> => {
    const userCollection = useUserCollection();
    const userEntity: UserEntity = userCreationDto;
    console.log(userEntity);
    const insertResult = await userCollection.insertOne(userEntity);
    return insertResult.insertedId.toString();
};

export const changeUser = async (
    userChangesDto: UserChangesDto
): Promise<string> => {
    const userCollection = useUserCollection();
    const updateResult = await userCollection.updateOne(
        { _id: new ObjectId(userChangesDto.id) },
        { userName: userChangesDto.userName }
    );
    return updateResult.upsertedId.toString();
};

export const getUserById = async (id: string): Promise<UserDto | null> => {
    const userCollection = useUserCollection();
    const userEntity = await userCollection.findOne<WithId<UserEntity>>({
        _id: new ObjectId(id),
    });
    if (!userEntity) {
        return null;
    }

    return mapUserEntityToDto(userEntity);
};

export const getUserByUserNameAndPassword = async (
    userName: string,
    password: string
): Promise<UserDto | null> => {
    const userCollection = useUserCollection();
    const userEntity = await userCollection.findOne<WithId<UserEntity>>({
        userName,
        password,
    });
    if (!userEntity) {
        return null;
    }

    return mapUserEntityToDto(userEntity);
};
