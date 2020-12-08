import { GenericOperation } from "../../generic/generic.operation";
import GenericDatabaseRepository from "../../repositories/generic.repositories";
import { Medic } from "../domain/entities/medic.entity";
import MedicModel from "./medic.model"

export class MedicOperation extends GenericDatabaseRepository< typeof MedicModel, Medic> {
  constructor(){
    super(MedicModel)
  }
  
  getByLocations() {
    console.log("List medics by locations");
  }
  // async insert(medic: Medic): Promise<Medic> {
  //   const medicInserted = await MedicModel.create(medic)
  //   return medicInserted;
  // }
  // async update(id: string | number, medic: Medic): Promise<Medic> {
  //   return medic;
  // }
  // async get(isActive: boolean): Promise<Medic[]> {
  //   const listMedic: Medic[] = [];
  //   return listMedic;
  // }
  // async getOne(id: string | number): Promise<Medic> {
  //   const medic: Medic = {};
  //   return medic;
  // }
  // async delete(id: string | number): Promise<Medic> {
  //   const medic: Medic = {};
  //   return medic;
  // }
}
