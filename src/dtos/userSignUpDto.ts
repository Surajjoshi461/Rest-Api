import { SignUpRequest } from "../types/request/signUpRequest";

export class UserSignUpDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  constructor(userDetail: SignUpRequest) {
    this.email = userDetail.email;
    this.firstName = userDetail.firstName;
    this.lastName = userDetail.lastName;
    this.password = userDetail.password;
  }
}
