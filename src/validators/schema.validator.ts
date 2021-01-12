import { Request, Response, NextFunction } from "express";
import { IError } from "../helpers/errors.helper";

export default class SchemaValidator{

  static generateError (objError : {name: string, status: number, message: string, stack: string, next: NextFunction}) { 
    let err:IError = new Error(objError.name)
    err.status = objError.status;
    err.message = objError.message
    err.stack = objError.stack;
    objError.next(err)
  }

  static validate(schemaValidation: any){
    return (req: Request, res: Response, next: NextFunction) : Promise<any> => {
      const listContainersParameters = ["headers", "body", "params", "query"]
      const listValidations: Array<Promise<any>> = []

      listContainersParameters.forEach( (container: any) => {
        if (schemaValidation.hasOwnProperty(container)){
          switch (container){
            case "body":
              listValidations.push(schemaValidation[container].validate(req.body))
              break
            case "headers":
              listValidations.push(schemaValidation[container].validate(req.body))
              break
            case "params":
              listValidations.push(schemaValidation[container].validate(req.body))
              break
            case "query":
              listValidations.push(schemaValidation[container].validate(req.body))
              break
          }
        }
      })

      return Promise.all(listValidations)
      .then(
        ( results) => { // Cuando todas las promesas responden
          let hasError = false
          results.forEach( result => {
            if (result.error && !hasError != false) {
              hasError = true
              SchemaValidator.generateError({ 
                name: "Parameter errors",
                message: "Error in parameters",
                status: 411,
                stack: result.error,
                next 
              })
            }
          } )
          if (!hasError){
            next()
          }
        },
        ( result ) => {
          res.status(411).json({status: 411, result: result.error});
        }
      )
    }
  }
}