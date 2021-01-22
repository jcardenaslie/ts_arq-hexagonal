import {Request, Response, NextFunction } from "express";
import { Tokens } from "../auth/application/auth.services";

export class AuthenticationMiddleware {
  static canActivate(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers
    const authotirization: any = headers.authorization

    if(authotirization){
      const parseAuthorization = authotirization.split(' ')

      if (parseAuthorization.lenght < 2) {
        res.status(401).send('User nor logged')
      } else {
        const accessToken: string = parseAuthorization[1]
        Tokens.validateAccessToken(accessToken)
          .then( (payload) => {
            res.locals.payload = payload
            console.log('====================================');
            console.log(payload);
            console.log('====================================');
            next()
          })
          .catch( (error:any) => {
              res.status(error.status).send(error.message)
          })  
      }
        
    } else {
      res.status(401).send("User not logged")
    }
  }
}