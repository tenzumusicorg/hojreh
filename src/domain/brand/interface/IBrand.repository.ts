import { IGenericRepository } from 'src/domain/database/generic-repository';
import { PaginateModel } from 'mongoose';
import { Brand } from '../entity/brand.entity';

export interface IBrandRepository extends IGenericRepository<Brand> {
  findOne(id: string): Promise<Brand>;
  createOne(entity: Brand): Promise<Brand>;
  updateOne(id: string, entity: Partial<Brand>): Promise<void>;
  find(): Promise<Brand[]>;
  deleteOne(id: string): void;
  model(): PaginateModel<Brand>;
}
export const IBrandRepository = Symbol('IBrandRepository');
