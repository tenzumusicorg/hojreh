import { IGenericRepository } from 'src/domain/database/generic-repository';
import { PaginateModel } from 'mongoose';
import { SubCategory } from '../entity/subcategory.entity';

export interface ISubCategoryRepository
  extends IGenericRepository<SubCategory> {
  findOne(id: string): Promise<SubCategory>;
  createOne(entity: SubCategory): Promise<SubCategory>;
  updateOne(id: string, entity: Partial<SubCategory>): Promise<void>;
  find(): Promise<SubCategory[]>;
  deleteOne(id: string): void;
  model(): PaginateModel<SubCategory>;
}
export const ISubCategoryRepository = Symbol('ISubCategoryRepository');
