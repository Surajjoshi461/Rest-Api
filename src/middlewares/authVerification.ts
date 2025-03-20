import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/userRepository";
import { UserType } from "../types/userType";
import AuthTokenVerification from "../utils/authTokenVerification";

export async function AuthVerification(req: Request, res: Response, next: NextFunction) {
    const userRepository = new UserRepository();
    const authHeader = req.headers.authorization;
    let token = authHeader ? authHeader.split(" ")[1] : null;

    // If no token in headers, check cookies
    if (!token && req.cookies?.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = await AuthTokenVerification.getUser(token);
        if (!decoded) {
            return res.status(401).json({ message: "Session expired" });
        }

        const user: UserType | null = await userRepository.findUserByEmail(req.body.email);
        if (!user) {
            return res.status(401).json({ message: "Session expired" });
        }
        if (user.sessionId !== token) {
            return res.status(401).json({ message: "Session expired" });
        }
        next();
    } catch (error) {
        return next(`Invalid token. Error: ${error}` );
    }
}
