import { IUserCreate, IUserDetails, IUserUpdate } from '../dtos/IUsers';
import UsersModel from '../models/UsersModel';

class AuthService {
    async createUser(user: IUserCreate) {
        await UsersModel.create(user);
    }

    async updateUser(id: string, user: IUserUpdate) {
        user.updatedAt = new Date();
        await UsersModel.updateOne({ _id: id }, user);
    }

    async getUserById(id: string) {
        return await UsersModel.findOne({ _id: id }).lean();
    }

    async getUserByUsername(username: string): Promise<IUserDetails> {
        return await UsersModel.findOne({ username }).lean();
    }

    async removeUserById(id: string) {
        const updateOptions = {
            isDeleted: true,
            updatedAt: new Date(),
        };
        await UsersModel.updateOne({ _id: id }, updateOptions);
    }
}

export const authService = new AuthService();