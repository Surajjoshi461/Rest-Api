import { GetUserParam } from "../types/params/getUserParam";

export class GetUserDto {
  userId: string

  constructor(param: GetUserParam) {
    this.userId = param.userId
  }
}
