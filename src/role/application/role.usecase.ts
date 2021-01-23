import yenv from 'yenv';
import { Role } from '../domain/entities/role.entity';
import { RoleRepository } from '../domain/repositories/role.repository';

const env = yenv();

export class RoleUseCase {
	constructor(private readonly repository: RoleRepository) {}

	async insert(role: Role) {
		return await this.repository.insert(role);
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

	async update(id: string | number, role: Role) {
		return await this.repository.update(id, role);
	}

	async delete(id: string | number) {
		return await this.repository.delete(id);
	}
}
