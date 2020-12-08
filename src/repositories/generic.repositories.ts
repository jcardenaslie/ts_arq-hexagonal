import { Model } from "mongoose"
import { IRepository } from "./irepository"

export default abstract class GenericDatabaseRepository<T extends Model<any>, U> implements IRepository<U> {
  private model:T

  constructor(model: T) {
    this.model = model
  }

  async getAll(filter: any = {}) : Promise<U[]> {
    const items: U[] =  await this.model.find(filter)
    return items
  }

  async getById(id: string) : Promise<U> {
    const items: U =  await this.model.findById(id)
    return items
  }

  async getByPage(filter:any, page:number, pageSize:number) : Promise<{total: number, items: U[]}> {
    const items: U[] = await this.model
      .find(filter)
      .skip(page*pageSize)
      .limit(pageSize)

    const total = await this.model.find(filter).count();
    return {total, items}
  }

  async insert(item: U) :Promise<U>{
    const itemInserted: U = await this.model.create(item);
    return itemInserted;
  }

  async update(filter: any = {},  item: U) : Promise<U>{
    const itemUpdated : U = await this.model.findOneAndUpdate(filter, item, {new: true})
    return itemUpdated
  }

  async delete( id: string ) : Promise<U> {
    const itemDelete : U = await this.model.findByIdAndUpdate(id, {isActive: false}, {new:true})
    return itemDelete
  }
}