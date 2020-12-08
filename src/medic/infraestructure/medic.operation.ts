import { MedicType } from './medic.type';
import GenericDatabaseRepository from "../../repositories/generic.repositories";
import MedicModel from "./medic.model"

export class MedicOperation extends GenericDatabaseRepository< typeof MedicModel, MedicType> {
  constructor(){
    super(MedicModel)
  }
  
  getByLocations() {
    console.log("List medics by locations");
  }
}
