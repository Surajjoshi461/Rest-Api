import { AppDataSource } from "../config";
import { User } from "../models/userEntity";
import { UserType } from "../types/userType";

export default class UserRepository {

    public async findUserByEmail(email: string): Promise<UserType | null> {
        const userRepo = AppDataSource.getRepository(User);
        return await userRepo.findOne({
            where: { email: email },
        });

    }

    public async updateSessionToken(userDetail: UserType) {
        const userRepo = AppDataSource.getRepository(User);
        return await userRepo.save(userDetail);
    }

    public async createUser(userDetail: UserType) {
        const userRepo = AppDataSource.getRepository(User);
        return await userRepo.save(userDetail);
    }
}