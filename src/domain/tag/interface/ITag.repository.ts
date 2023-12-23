import { IGenericRepository } from 'src/domain/database/generic-repository';
import { PaginateModel } from 'mongoose';
import { Tag } from '../entity/tag.entity';

export interface ITagRepository extends IGenericRepository<Tag> {
  findOne(id: string): Promise<Tag>;
  createOne(entity: Tag): Promise<Tag>;
  updateOne(id: string, entity: Partial<Tag>): Promise<void>;
  find(): Promise<Tag[]>;
  deleteOne(id: string): void;
  model(): PaginateModel<Tag>;
}
export const ITagRepository = Symbol('ITagRepository');
