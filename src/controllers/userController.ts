import { Request, Response, NextFunction } from "express";
import httpstatuscode from 'http-status-codes'

import { ApiResponse, EmptyObject } from "../helper/apiResponse";
import { LoginResponseType } from "../types/loginResponseType";
import { LoginRequestType } from "../types/loginRequestType";
import UserLoginDto from "../dtos/userLoginDto";
import UserService from "../services/userService";
import constant from "../constant";
import { UserSignUpDto } from "../dtos/userSignUpDto";
import { SignUpRequest } from "../types/signUpRequest";
import { SignUpResponse } from "../types/signUpResponse";

export default class UserController {
    private _userService: UserService
    constructor() {
        this._userService = new UserService()
    }

    public async userLogin(req: Request<EmptyObject, ApiResponse<LoginResponseType>, LoginRequestType>,
        res: Response<ApiResponse<LoginResponseType>>,
        next: NextFunction) {
        const userDto = new UserLoginDto(req.body)
        try {
            const userResponse = await this._userService.userLogin(userDto);
            const response = new ApiResponse<LoginResponseType>(
                httpstatuscode.OK,
                constant.ControllerMessage.SUCCESS,
                userResponse)
            res.status(response.status).json(response)
        } catch (error) {
            next(`Error in #controller#creatUser method. Error: ${error}`);
        }
    }

    public async createUser(
        req: Request<EmptyObject, ApiResponse<SignUpResponse>, SignUpRequest>,
        res: Response<ApiResponse<SignUpResponse>>,
        next: NextFunction
    ) {
        const userDto = new UserSignUpDto(req.body);
        try {
            const userResponse = await this._userService.createUser(userDto);
            const response = new ApiResponse<SignUpResponse>(
                httpstatuscode.CREATED,
                constant.ControllerMessage.CREATED,
                userResponse
            );
            res.status(response.status).send(response);
        } catch (error) {
            next(`Error in #userController#createUser method. Error: ${error}`);
        }
    }
}