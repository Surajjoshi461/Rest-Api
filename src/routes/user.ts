import express from 'express'
import UserController from '../controllers/userController'
import { signUpValidation } from '../middlewares/signUpValidation';
import { PathParams, ResponseBody, RequestBody, QueryParams } from '../helper/customerRequest/CustomRequest';
import { SignUpResponse } from '../types/response/signUpResponse';
import { SignUpRequest } from '../types/request/signUpRequest';
import { LoginResponseType } from '../types/response/loginResponseType';
import { LoginRequestType } from '../types/request/loginRequestType';
import { GetUserParam } from '../types/params/getUserParam';
import { GetUserResponse } from '../types/response/getUserResponse';
import { AuthVerification } from '../middlewares/authVerification';

const userRouter = express.Router();

const userController = new UserController()

userRouter.post<PathParams, ResponseBody<SignUpResponse>, RequestBody<SignUpRequest>, QueryParams>(
    "/signup", signUpValidation, (...args) =>
    userController.createUser(...args)
);

userRouter.post<
    PathParams,
    ResponseBody<LoginResponseType>,
    RequestBody<LoginRequestType>,
    QueryParams>(
        '/login', (...args) => userController.userLogin(...args)
    );

userRouter.get<
    PathParams<GetUserParam>,
    ResponseBody<GetUserResponse>,
    RequestBody,
    QueryParams>(
        '/user', AuthVerification, (...args) => userController.getUser(...args)
    );

export const router = userRouter
export const basePath = "/api/v1/user"

