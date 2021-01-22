import bcrypt from "bcryptjs"
import yenv from "yenv";
import { User } from "../../user/domain/entities/user.entity";
import { AuthRepository } from "../domain/repositories/auth.repository";
import { Tokens } from "./auth.services";
import { RoleTokenDto } from "./roleToken.dto";

const env = yenv()
export class AuthUseCase {
  constructor(private readonly repository:AuthRepository) {

  }

  async login(user: User) {
    const response = await this.repository.login(user)
    const {name, roles, password, refreshToken} = response
    const userInDB = {name, roles, password, refreshToken}

    userInDB.roles = RoleTokenDto(response.roles)

    if (response) {

      const matched = await bcrypt.compare(user.password, response.password)

      if (matched)
        return { 
          accessToken: Tokens.generateAccessToken(response), 
          refreshToken: response.refreshToken 
        }

      return null
    } else {
      return null
    }

    return await this.repository.login(user);
  }
}
