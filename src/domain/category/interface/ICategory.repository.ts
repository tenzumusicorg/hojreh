import { IGenericRepository } from 'src/domain/database/generic-repository';
import { PaginateModel } from 'mongoose';
import { Category } from '../entity/category.entity';

export interface ICategoryRepository extends IGenericRepository<Category> {
  findOne(id: string): Promise<Category>;
  createOne(entity: Category): Promise<Category>;
  updateOne(id: string, entity: Partial<Category>): Promise<void>;
  find(): Promise<Category[]>;
  deleteOne(id: string): void;
  model(): PaginateModel<Category>;
}
export const ICategoryRepository = Symbol('ICategoryRepository');
