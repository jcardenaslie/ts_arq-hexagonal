import { Request, Response, NextFunction } from "express";

export default class Schemavalidator{
  static validate(schemaValdiation: any){
    return (req: Request, res: Response, next: NextFunction) => {

    }
  }
}