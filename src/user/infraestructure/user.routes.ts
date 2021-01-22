import { schema as UserSchema } from './user.schema';
import express from "express";
import { UserOperation } from "./user.operation";
import { UserUseCase } from "../application/user.usecase";
import { UserController } from "./user.controller";
import { User } from "../domain/entities/user.entity";
import SchemaValidator from "../../validators/schema.validator";
import { Errors } from "../../helpers/errors.helper"
import { AuthenticationMiddleware } from '../../middlewares/authentication.mw';
import { AuthorizationMiddleWare } from '../../middlewares/authorization.mw';
import { Upload } from '../../middlewares/upload.mw';

const userOperation = new UserOperation();
const userUseCase = new UserUseCase(userOperation);
const userController = new UserController(userUseCase);

const router = express.Router();

// router.use(AuthenticationMiddleware.canActivate)

router.get("/",
  AuthenticationMiddleware.canActivate,
  AuthorizationMiddleWare.canActivete("ADMINS"), 
  Errors.asyncError(async (req, res) => {
    const result = await userController.getAll(true);
    res.json(result);
}));

router.get("/:id", 
  AuthenticationMiddleware.canActivate,
  AuthorizationMiddleWare.canActivete("ADMINS"),
  SchemaValidator.validate(UserSchema.GET_ONE), 
  Errors.asyncError(async (req, res) => {
    const id = req.params.id
    const result = await userController.getOne(id);
    res.json(result);
  })
);

router.post("/", 
  AuthenticationMiddleware.canActivate,
  AuthorizationMiddleWare.canActivete("ADMINS"),
  Upload.s3("profile-photo"),
  SchemaValidator.validate(UserSchema.POST_INSERT), 
  Errors.asyncError(async (req, res) => {
		const  {name, email, password, roles} = req.body
		const user: User = {
			name,
			email,
      password,
      roles,
      isActive: true
		};
		const result = await userController.insert(user);
		res.json(result);
  })
);

router.put("/:id",
  AuthenticationMiddleware.canActivate,
  SchemaValidator.validate(UserSchema.UPDATE),
  AuthorizationMiddleWare.canActivete("ADMINS"),
  Errors.asyncError(async (req, res) => {
    const user: User = req.body
    const result = await userController.update(1, user);
    res.json(result);
  })
);

router.delete("/:id",
  AuthenticationMiddleware.canActivate,
  SchemaValidator.validate(UserSchema.DELETE), 
  AuthorizationMiddleWare.canActivete("ADMINS"),
  Errors.asyncError(async (req, res) => {
    const result = await userController.delete(1);
    res.json(result);
  })
);

router.get(
  '/page/:page',
  AuthenticationMiddleware.canActivate,
  SchemaValidator.validate(UserSchema.PAGINATION),
  AuthorizationMiddleWare.canActivete("ADMINS"),
	Errors.asyncError(async (req, res) => {
		const page = +req.params.page;
		const results = await userController.getByPage(page);
		res.json({ status: 200, results });
	})
);

export { router };
