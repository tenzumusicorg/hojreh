import { IGenericRepository } from 'src/domain/database/generic-repository';
import { PaginateModel } from 'mongoose';
import { Product } from '../entity/product';

export interface IProductRepository extends IGenericRepository<Product> {
  findOne(id: string): Promise<Product>;
  createOne(entity: Product): Promise<Product>;
  updateOne(id: string, entity: Partial<Product>): Promise<void>;
  find(): Promise<Product[]>;
  deleteOne(id: string): void;
  model(): PaginateModel<Product>;
}
export const IProductRepository = Symbol('IProductRepository');
