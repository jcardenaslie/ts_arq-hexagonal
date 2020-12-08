import { Medic } from "../domain/entities/medic.entity";
import { MedicRepository } from "../domain/repositories/medic.repository";

export class MedicUseCase {
  constructor(private readonly repository:MedicRepository) {}

  async insert(medic: Medic) {
    return await this.repository.insert(medic);
  }

  async getAll(isActive: boolean) {
    return await this.repository.getAll(isActive);
  }

  async getOne(id: string | number) {
    return await this.repository.getById(id);
  }

  async update(id: string | number, medic: Medic) {
    return await this.repository.update(id, medic);
  }

  async delete(id: string | number) {
    return await this.repository.delete(id);
  }
}
