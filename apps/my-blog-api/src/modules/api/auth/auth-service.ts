import { result } from "../../../lib/result";
import {
    createUser,
    getUserById,
    getUserByUserNameAndPassword,
} from "../user/user-service";

interface LoginUserDto {
    userName: string;
    password: string;
}

interface RegisterUserDto {
    userName: string;
    password: string;
}

export const loginUser = async (userDto: LoginUserDto) => {
    const { userName, password } = userDto;
    const user = await getUserByUserNameAndPassword(userName, password);
    if (!user) {
        return result.error.BadUserCredentials;
    }

    return result.ok(user.id);
};

export const registerUser = async (userDto: RegisterUserDto) => {
    const userId = await createUser(userDto);
    return result.ok(userId);
};

export const identityUser = async (userId: string) => {
    const user = await getUserById(userId);
    if (!user) {
        return result.error.NotFound;
    }

    return result.ok(user);
};
