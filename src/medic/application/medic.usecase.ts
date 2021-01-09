import yenv from "yenv";
import { Medic } from "../domain/entities/medic.entity";
import { MedicRepository } from "../domain/repositories/medic.repository";


const env = yenv()
export class MedicUseCase {
  constructor(private readonly repository:MedicRepository) {}

  async insert(medic: Medic) {
    return await this.repository.insert(medic);
  }

  async getAll(isActive: boolean) {
		return await this.repository.getAll({ isActive: true });
  }

  async getOne(id: string | number) {
    return await this.repository.getById(id);
  }

  async getByPage(page: number) {
    const filter = {isActive: true}
    return await this.repository.getByPage(filter, page, env.PAGINATION.PAGE_SIZE);
  }

  async update(id: string | number, medic: Medic) {
    return await this.repository.update(id, medic);
  }

  async delete(id: string | number) {
    return await this.repository.delete(id);
  }
}
