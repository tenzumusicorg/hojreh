import { IGenericRepository } from 'src/domain/database/generic-repository';
import { PaginateModel } from 'mongoose';
import { ProductGroup } from '../entity/product-group';

export interface IProductGroupRepository
  extends IGenericRepository<ProductGroup> {
  findOne(id: string): Promise<ProductGroup>;
  createOne(entity: ProductGroup): Promise<ProductGroup>;
  updateOne(id: string, entity: Partial<ProductGroup>): Promise<void>;
  find(): Promise<ProductGroup[]>;
  deleteOne(id: string): void;
  model(): PaginateModel<ProductGroup>;
}
export const IProductGroupRepository = Symbol('IProductGroupRepository');
