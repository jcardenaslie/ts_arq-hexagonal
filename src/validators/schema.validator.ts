import { Request, Response, NextFunction } from "express";

export default class SchemaValidator{
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
              res.status(411).json({status: 411, result: result.error});
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