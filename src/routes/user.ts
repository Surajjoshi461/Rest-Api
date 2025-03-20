import express from 'express'
import UserController from '../controllers/userController'
import { signUpValidation } from '../middlewares/signUpValidation';

const userRouter = express.Router();

const userController = new UserController()

userRouter.post("/signup", signUpValidation, (...args) =>
    userController.createUser(...args)
);

userRouter.post('/login', (...args) => userController.userLogin(...args))

export const router = userRouter
export const basePath = "/api/v1/user"

