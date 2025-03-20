import { NextFunction, Request, Response } from "express";
import { ApiResponse, EmptyObject } from "../helper/apiResponse";
import { SignUpRequest } from "../types/signUpRequest";
import { SignUpResponse } from "../types/signUpResponse";

export async function signUpValidation(
  req: Request<EmptyObject, ApiResponse<SignUpResponse>, SignUpRequest>,
  res: Response<ApiResponse<SignUpResponse>>,
  next: NextFunction
) {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !firstName || !lastName || !password) {
      return next(Error("All fields are required"));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(new Error("Please provide correct email"));
    }
    if (password.length < 6) {
      return next(new Error("Password must be at least 6 characters"));
    }
    next();
  } catch (error) {
    return next(`Error in signUpValidation. Error: ${error}`);
  }
}
