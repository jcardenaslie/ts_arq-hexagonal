import { Response, Request, NextFunction } from 'express';

export class AuthorizationMiddleWare {
	static canActivete(...rolesAllowed: Array<string>) {
		return (req: Request, res: Response, next: NextFunction) => {
			const { roles } = res.locals.payload;

			let roleMatched = false;
			roles.forEach((r: { [s: string]: string }) => {
				if (rolesAllowed.indexOf(r.name) > -1) {
					roleMatched = true;
					next();
				}
			});

			if (!roleMatched) res.status(409).send('User not authorized');
		};
	}
}
