import { NextFunction, Request, Response } from "express";
import HttpStatus from 'http-status-codes';

import UserRepository from "../repositories/userRepository";
import { UserType } from "../types/userType";
import AuthTokenVerification from "../utils/authTokenVerification";
import { ExpressError } from "../helper/errorHandler/expressError";
import constant from "../constant";
import CustomRequest from "../helper/customerRequest/CustomRequest";
import { UserAuthTokenRequest } from "../types/UserAuthTokenRequest";

export async function AuthVerification(req: CustomRequest, res: Response, next: NextFunction) {
    const userRepository = new UserRepository();
    const authHeader = req.headers.authorization;
    let token = authHeader ? authHeader.split(" ")[1] : null;

    // If no token in headers, check cookies. i handle it for both header and for cookie
    if (!token && req.cookies?.authToken) {
        //get token from http-only cookies
        token = req.cookies.authToken;
    }

    if (!token) {
        return next(new ExpressError(HttpStatus.FORBIDDEN, constant.VALIDATION.TOKEN_MISSING))
    }
    try {
        const decoded: UserAuthTokenRequest = await AuthTokenVerification.getUser(token);
        if (!decoded) {
            return next(new ExpressError(HttpStatus.FORBIDDEN, constant.VALIDATION.UNAUTHORIZE))
        }
        const user: UserType | null = await userRepository.findUserByUserId(decoded.userId);
        if (!user) {
            return next(new ExpressError(HttpStatus.FORBIDDEN, constant.VALIDATION.UNAUTHORIZE))
        }
        if (user.sessionId !== token) {
            return next(new ExpressError(HttpStatus.FORBIDDEN, constant.VALIDATION.TOKEN_EXPIRED))
        }
        next();
    } catch (error) {
        return next(new ExpressError(HttpStatus.FORBIDDEN, constant.VALIDATION.UNAUTHORIZE))
    }
}
