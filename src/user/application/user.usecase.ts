import yenv from 'yenv';
import { User } from '../domain/entities/user.entity';
import { UserRepository } from '../domain/repositories/user.repository';
import bcrypt from 'bcryptjs';
import { Tokens } from '../../auth/application/auth.services';

const env = yenv();
export class UserUseCase {
	constructor(private readonly repository: UserRepository) {}

	async insert(user: User) {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
		user.refreshToken = Tokens.generateRefreshToken();
		return await this.repository.insert(user);
	}

	async getAll(isActive: boolean) {
		return await this.repository.getAll({ isActive: true });
	}

	async getOne(id: string | number) {
		return await this.repository.getById(id);
	}

	async getByPage(page: number) {
		const filter = { isActive: true };
		return await this.repository.getByPage(
			filter,
			page,
			env.PAGINATION.PAGE_SIZE
		);
	}

	async update(id: string | number, user: User) {
		return await this.repository.update(id, user);
	}

	async delete(id: string | number) {
		return await this.repository.delete(id);
	}
}
