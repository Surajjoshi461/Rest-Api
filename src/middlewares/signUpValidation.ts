import { NextFunction, Request, Response } from "express";
import HttpStatus from 'http-status-codes';

import { ApiResponse, EmptyObject } from "../helper/apiResponse/apiResponse";
import { SignUpRequest } from "../types/request/signUpRequest";
import { SignUpResponse } from "../types/response/signUpResponse";
import { ExpressError } from "../helper/errorHandler/expressError";
import constant from "../constant";
import CustomRequest from "../helper/customerRequest/CustomRequest";

export async function signUpValidation(
  req: CustomRequest<EmptyObject, SignUpResponse, SignUpRequest>,
  _res: Response<ApiResponse<SignUpResponse>>,
  next: NextFunction
) {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !firstName || !lastName || !password) {
      return next(new ExpressError(HttpStatus.FORBIDDEN, constant.VALIDATION.UNAUTHORIZE));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(new ExpressError(HttpStatus.FORBIDDEN, constant.VALIDATION.UNAUTHORIZE));
    }
    if (password.length < 6) {
      return next(new ExpressError(HttpStatus.FORBIDDEN, constant.VALIDATION.UNAUTHORIZE))
    }
    next();
  } catch (error) {
    return next(new ExpressError(HttpStatus.FORBIDDEN, constant.VALIDATION.UNAUTHORIZE));
  }
}
