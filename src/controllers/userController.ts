import { Response, NextFunction } from "express";
import HttpStatus from 'http-status-codes'

import { ApiResponse, EmptyObject } from "../helper/apiResponse/apiResponse";
import { LoginResponseType } from "../types/response/loginResponseType";
import { LoginRequestType } from "../types/request/loginRequestType";
import UserLoginDto from "../dtos/userLoginDto";
import UserService from "../services/userService";
import constant from "../constant";
import { UserSignUpDto } from "../dtos/userSignUpDto";
import { SignUpRequest } from "../types/request/signUpRequest";
import { SignUpResponse } from "../types/response/signUpResponse";
import { ExpressError } from "../helper/errorHandler/expressError";
import CustomRequest from "../helper/customerRequest/CustomRequest";
import { GetUserParam } from "../types/params/getUserParam";
import { GetUserDto } from "../dtos/getUserDto";
import { GetUserResponse } from "../types/response/getUserResponse";

export default class UserController {
    private _userService: UserService
    constructor() {
        this._userService = new UserService()
    }

    public async userLogin(req: CustomRequest<EmptyObject, LoginResponseType, LoginRequestType, EmptyObject>,
        res: Response<ApiResponse<LoginResponseType>>,
        next: NextFunction
    ): Promise<void> {
        const userDto = new UserLoginDto(req.body)
        try {
            const userResponse = await this._userService.userLogin(userDto);
            const response = new ApiResponse<LoginResponseType>(
                HttpStatus.OK,
                constant.ControllerMessage.SUCCESS,
                userResponse)
            res.cookie('authToken', userResponse.token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30-day expiration
            })
            res.status(response.status).json(response)
        } catch (error) {
            if (error instanceof ExpressError) {
                next(new ExpressError(error.status, error.message));
            } else if (error instanceof Error) {
                next(new ExpressError(500, error.message));
            } else {
                next(new ExpressError(500, "An unknown error occurred"));
            }
        }
    }

    public async createUser(
        req: CustomRequest<EmptyObject, SignUpResponse, SignUpRequest, EmptyObject>,
        res: Response<ApiResponse<SignUpResponse>>,
        next: NextFunction
    ) {
        const userDto = new UserSignUpDto(req.body);
        try {
            const userResponse = await this._userService.createUser(userDto);
            const response = new ApiResponse<SignUpResponse>(
                HttpStatus.CREATED,
                constant.ControllerMessage.CREATED,
                userResponse
            );
            res.status(response.status).send(response);
        } catch (error) {
            if (error instanceof ExpressError) {
                next(new ExpressError(error.status, error.message));
            } else if (error instanceof Error) {
                next(new ExpressError(500, error.message));
            } else {
                next(new ExpressError(500, "An unknown error occurred"));
            }
        }
    }

    public async getUser(
        req: CustomRequest<GetUserParam, GetUserResponse, EmptyObject, EmptyObject>,
        res: Response<ApiResponse<GetUserResponse>>,
        next: NextFunction
    ) {
        const userDto = new GetUserDto(req.params);
        try {
            const userResponse = await this._userService.getUser(userDto);
            const response = new ApiResponse<GetUserResponse>(
                HttpStatus.OK,
                constant.ControllerMessage.SUCCESS,
                userResponse
            );
            res.status(response.status).send(response);
        } catch (error) {
            if (error instanceof ExpressError) {
                next(new ExpressError(error.status, error.message));
            } else if (error instanceof Error) {
                next(new ExpressError(500, error.message));
            } else {
                next(new ExpressError(500, "An unknown error occurred"));
            }
        }
    }
}