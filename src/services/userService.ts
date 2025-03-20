import UserConverter from "../commons/converters/userConverter";
import UserLoginDto from "../dtos/userLoginDto";
import { UserSignUpDto } from "../dtos/userSignUpDto";
import UserRepository from "../repositories/userRepository";
import { LoginResponseType } from "../types/loginResponseType";
import { UserType } from "../types/userType";
import AuthTokenVerification from "../utils/authTokenVerification";
import PasswordUtil from "../utils/passwordUtil";

export default class UserService {
    private _userRepository: UserRepository
    constructor() {
        this._userRepository = new UserRepository()
    }

    public async userLogin(userDto: UserLoginDto): Promise<LoginResponseType> {
        try {
            const userDetail = await this._userRepository.findUserByEmail(userDto.email)
            if (!userDetail) {
                throw new Error(`User not found`);
            }
            const isCorrectPass = PasswordUtil.varifying(userDetail.password, userDto.password);
            if (!isCorrectPass) {
                throw new Error("Wrong Password");
            }
            const token = await AuthTokenVerification.setUser(userDetail.userId)
            userDetail.sessionId = token;
            await this._userRepository.updateSessionToken(userDetail)
            return { userId: userDetail.userId, token: token }
        } catch (error) {
            throw new Error(`Error in #UserService#createUser method. Error: ${error}`);

        }
    }

    public async createUser(userDto: UserSignUpDto) {
        try {
          const isUserExist = await this._userRepository.findUserByEmail(userDto.email);
          if (isUserExist) {
            throw new Error("Email already exist");
          }
          const userDetail = await UserConverter.toSignUpResponse(userDto);
          await this._userRepository.createUser(userDetail);
          return { success: true };
        } catch (error) {
          throw new Error(`Error in #UserService/signUp method. Error: ${error}`);
        }
      }
}