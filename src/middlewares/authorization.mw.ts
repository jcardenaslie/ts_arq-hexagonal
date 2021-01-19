import { Response, Request, NextFunction } from "express";

export class AuthorizationMiddleWare {
  canActivete (...rolesAllowed: Array<string> ) {
    return ( req: Request, res: Response, next: NextFunction) => {
      const {roles} = res.locals.payload
    }
  }
}