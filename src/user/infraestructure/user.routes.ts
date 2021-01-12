import { schema as UserSchema } from './user.schema';
import express from "express";
import { UserOperation } from "./user.operation";
import { UserUseCase } from "../application/user.usecase";
import { UserController } from "./user.controller";
import { User } from "../domain/entities/user.entity";
import SchemaValidator from "../../validators/schema.validator";
import { Errors } from "../../helpers/errors.helper"


const userOperation = new UserOperation();
const userUseCase = new UserUseCase(userOperation);
const userController = new UserController(userUseCase);

const router = express.Router();

router.get("/", Errors.asyncError(async (req, res) => {
  const result = await userController.getAll(true);
  res.json(result);
}));

router.get("/:id", 
  SchemaValidator.validate(UserSchema.GET_ONE), 
  Errors.asyncError(async (req, res) => {
    const id = req.params.id
    const result = await userController.getOne(id);
    res.json(result);
  })
);

router.post("/", 
	SchemaValidator.validate(UserSchema.POST_INSERT), 
  Errors.asyncError(async (req, res) => {
		const  {name, email, password} = req.body
		const user: User = {
			name,
			email,
			password
		};
		const result = await userController.insert(user);
		res.json(result);
  })
);

router.put("/:id", 
  SchemaValidator.validate(UserSchema.UPDATE),
  Errors.asyncError(async (req, res) => {
    const user: User = {
      name: "Sergio",
      email: "sergiohidalgocaceres@gmail.com",
      password: "1234",
      isActive: true,
    };
    const result = await userController.update(1, user);
    res.json(result);
  })
);

router.delete("/:id", 
  SchemaValidator.validate(UserSchema.DELETE), 
  Errors.asyncError(async (req, res) => {
    const result = await userController.delete(1);
    res.json(result);
  })
);

router.get(
	'/page/:page',
	SchemaValidator.validate(UserSchema.PAGINATION),
	Errors.asyncError(async (req, res) => {
		const page = +req.params.page;
		const results = await userController.getByPage(page);
		res.json({ status: 200, results });
	})
);

export { router };
