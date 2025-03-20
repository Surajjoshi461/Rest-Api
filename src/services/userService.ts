import HttpStatus from 'http-status-codes';

import UserConverter from "../commons/converters/userConverter";
import { GetUserDto } from "../dtos/getUserDto";
import UserLoginDto from "../dtos/userLoginDto";
import { UserSignUpDto } from "../dtos/userSignUpDto";
import { ExpressError } from "../helper/errorHandler/expressError";
import UserRepository from "../repositories/userRepository";
import { LoginResponseType } from "../types/response/loginResponseType";
import AuthTokenVerification from "../utils/authTokenVerification";
import PasswordUtil from "../utils/passwordUtil";
import constant from '../constant';
import { GetUserResponse } from '../types/response/getUserResponse';

export default class UserService {
    private _userRepository: UserRepository
    constructor() {
        this._userRepository = new UserRepository()
    }

    public async userLogin(userDto: UserLoginDto): Promise<LoginResponseType> {
        const userDetail = await this._userRepository.findUserByEmail(userDto.email)
        if (!userDetail) {
            throw new ExpressError(HttpStatus.NOT_FOUND, constant.VALIDATION.USER_NOT_FOUND)
        }
        const isCorrectPass = PasswordUtil.varifying(userDetail.password, userDto.password);
        if (!isCorrectPass) {
            throw new ExpressError(HttpStatus.NOT_FOUND, constant.VALIDATION.INCORRECT_PASSWORD)
        }
        const token = await AuthTokenVerification.setUser(userDetail.userId)
        userDetail.sessionId = token;
        await this._userRepository.updateSessionToken(userDetail)
        return { userId: userDetail.userId, token: token }

    }

    public async createUser(userDto: UserSignUpDto) {
        const isUserExist = await this._userRepository.findUserByEmail(userDto.email);
        if (!isUserExist) {
            throw new ExpressError(HttpStatus.NOT_FOUND, constant.VALIDATION.USER_NOT_FOUND)
        }
        const userDetail = await UserConverter.toSignUpResponse(userDto);
        await this._userRepository.createUser(userDetail);
        return { success: true };

    }

    public async getUser(userDto: GetUserDto): Promise<GetUserResponse> {
        const userDetails = await this._userRepository.findUserByUserId(userDto.userId);
        if (!userDetails) {
            throw new ExpressError(HttpStatus.NOT_FOUND, constant.VALIDATION.USER_NOT_FOUND)
        }
        return userDetails as GetUserResponse;

    }
}