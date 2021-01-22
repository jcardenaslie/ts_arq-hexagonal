import { User } from "../../user/domain/entities/user.entity"
import moment from "moment"
import jwtSimple from "jwt-simple"
import yenv from "yenv"
import { v4 as uuidv4 } from "uuid"
const env = yenv()

export class Tokens {
  static generateAccessToken (user: User): string {
    const payload = {
      iat: moment().unix(),
      exp: moment().add(env.TOKEN.TIMEOUT, env.TOKEN.UNITS).unix(),
      name: user.name,
      roles: user.roles
    }

    const accessToken = jwtSimple.encode( payload, env.TOKEN.KEYWORD)

    return accessToken
  }

  static generateRefreshToken (): string {
    const refreshToken: string = uuidv4()
    return refreshToken
  }

  static validateAccessToken (accessToken: string): Promise<any> {
    const promiseValidate = new Promise((resolve, reject) => {
      try {
        const payload = jwtSimple.decode(accessToken, env.TOKEN.KEYWORD)
        resolve(payload)
      } catch (err) {
        if (err.message.toLowerCase() === 'token expired'){
          reject({
            status: 409,
            message: 'Token expired'
          })
        } else {
          reject({
            status: 401,
            message: 'Token invalid'
          })
        }
      }
    })

    return promiseValidate
  }

}