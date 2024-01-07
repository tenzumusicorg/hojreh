import { IGenericRepository } from 'src/domain/database/generic-repository';
import { PaginateModel } from 'mongoose';
import { PropertyIndex } from '../entity/property-index';

export interface IPropertyIndexRepository
  extends IGenericRepository<PropertyIndex> {
  findOne(id: string): Promise<PropertyIndex>;
  createOne(entity: PropertyIndex): Promise<PropertyIndex>;
  updateOne(id: string, entity: Partial<PropertyIndex>): Promise<void>;
  find(): Promise<PropertyIndex[]>;
  deleteOne(id: string): void;
  model(): PaginateModel<PropertyIndex>;
  findBySubCategory(subcategory: string): Promise<PropertyIndex[]>;
}
export const IPropertyIndexRepository = Symbol('IPropertyIndexRepository');
