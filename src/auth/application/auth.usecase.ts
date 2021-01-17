import bcrypt from "bcryptjs"
import yenv from "yenv";
import { User } from "../../user/domain/entities/user.entity";
import { AuthRepository } from "../domain/repositories/auth.repository";
import { Tokens } from "./auth.services";

const env = yenv()
export class AuthUseCase {
  constructor(private readonly repository:AuthRepository) {}

  async login(user: User) {
    
    const userInDB = await this.repository.login(user)

    if (userInDB) {

      const matched = await bcrypt.compare(user.password, userInDB.password)

      if (matched)
        return { 
          accessToken: Tokens.generateAccessToken(userInDB), 
          refreshToken: userInDB.refreshToken 
        }

      return null
    } else {
      return null
    }

    return await this.repository.login(user);
  }
}
