import constant from "../../constant";
import { UserSignUpDto } from "../../dtos/userSignUpDto";
import { UserType } from "../../types/userType";
import PasswordUtil from "../../utils/passwordUtil";
import AuthTokenVerification from "../../utils/authTokenVerification";

export default class UserConverter {
  public static async toSignUpResponse(userDto: UserSignUpDto): Promise<UserType> {
    const userId = constant.GENERATE_UUID()
    return {
      userId: userId,
      email: userDto.email,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      password: await PasswordUtil.hashing(userDto.password),
      sessionId: await AuthTokenVerification.setUser(userId)
    };
  }
}
