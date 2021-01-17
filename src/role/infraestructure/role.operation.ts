import { RoleType } from './role.type';
import GenericDatabaseRepository from "../../repositories/generic.repositories";
import RoleModel from "./role.model"

export class RoleOperation extends GenericDatabaseRepository< typeof RoleModel, RoleType> {
  constructor(){
    super(RoleModel)
  }
  
  getByLocations() {
    console.log("List users by locations");
  }
}
