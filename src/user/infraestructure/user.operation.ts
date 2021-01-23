import { UserType } from './user.type';
import GenericDatabaseRepository from '../../repositories/generic.repositories';
import UserModel from './user.model';

export class UserOperation extends GenericDatabaseRepository<
	typeof UserModel,
	UserType
> {
	constructor() {
		super(UserModel);
	}

	getByLocations() {
		console.log('List users by locations');
	}
}
