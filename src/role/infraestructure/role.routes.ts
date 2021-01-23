import { schema as UserSchema } from './role.schema';
import express from 'express';
import { RoleOperation } from './role.operation';
import { RoleUseCase } from '../application/role.usecase';
import { RoleController } from './role.controller';
import { Role } from '../domain/entities/role.entity';
import SchemaValidator from '../../validators/schema.validator';
import { Errors } from '../../helpers/errors.helper';

const userOperation = new RoleOperation();
const userUseCase = new RoleUseCase(userOperation);
const userController = new RoleController(userUseCase);

const router = express.Router();

router.get(
	'/',
	Errors.asyncError(async (req, res) => {
		const result = await userController.getAll(true);
		res.json(result);
	})
);

router.get(
	'/:id',
	SchemaValidator.validate(UserSchema.GET_ONE),
	Errors.asyncError(async (req, res) => {
		const id = req.params.id;
		const result = await userController.getOne(id);
		res.json(result);
	})
);

router.post(
	'/',
	SchemaValidator.validate(UserSchema.POST_INSERT),
	Errors.asyncError(async (req, res) => {
		const { name } = req.body;
		const role: Role = {
			name,
		};
		const result = await userController.insert(role);
		res.json(result);
	})
);

router.put(
	'/:id',
	SchemaValidator.validate(UserSchema.UPDATE),
	Errors.asyncError(async (req, res) => {
		const role: Role = {
			name: 'Sergio',
			isActive: true,
		};
		const result = await userController.update(1, role);
		res.json(result);
	})
);

router.delete(
	'/:id',
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
