import { LoginRequestType } from "../types/request/loginRequestType"

export default class UserLoginDto {
    email: string
    password: string
    constructor(body: LoginRequestType) {
        this.email = body.email;
        this.password = body.password
    }
}