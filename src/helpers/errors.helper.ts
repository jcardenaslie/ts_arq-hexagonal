import express, {Request, Response, NextFunction, static} from "express"

export class Errors {
		static asynError (
			ftn: (req: Request, res: Response, next: NextFunction) => Promise<any>
		) => {
			return (req: Request, res: Response, next: NextFunction) => {
				ftn(req, res, next).catch( err => {
					res.status(500).json({status: 500, err})
				});
			}
		}

		static pathNotFoundError(req: Request, res: Response, next: NextFunction) {
			// res.status(404).json({ status: 404, message: "Path not found" });
			const err: IError = new Error('Path not found');
			err.status = 404;
			next(err);
		}
}