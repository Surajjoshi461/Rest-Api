import jwt from 'jsonwebtoken'
import { serverConfig } from '../config'
import constant from '../constant'
import { UserAuthTokenRequest } from '../types/UserAuthTokenRequest'

export default class AuthTokenVerification {
    public static async setUser(userId: string): Promise<string> {
        const sessionId = constant.GENERATE_UUID()
        return jwt.sign({ userId, sessionId }, serverConfig.JWT_SECRET_KEY ?? '123', { expiresIn: '30d' })
    }

    public static async getUser(token: string): Promise<UserAuthTokenRequest> {
        return jwt.verify(token, serverConfig.JWT_SECRET_KEY ?? '123') as UserAuthTokenRequest
    }
}