import { IGenericRepository } from 'src/domain/database/generic-repository';
import { PaginateModel } from 'mongoose';
import { Model } from '../entity/model.entity';

export interface IModelRepository extends IGenericRepository<Model> {
  findOne(id: string): Promise<Model>;
  createOne(entity: Model): Promise<Model>;
  updateOne(id: string, entity: Partial<Model>): Promise<void>;
  find(): Promise<Model[]>;
  deleteOne(id: string): void;
  model(): PaginateModel<Model>;
}
export const IModelRepository = Symbol('IModelRepository');
