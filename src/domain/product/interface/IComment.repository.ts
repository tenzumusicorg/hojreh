import { IGenericRepository } from 'src/domain/database/generic-repository';
import { PaginateModel } from 'mongoose';
import { Comment } from '../entity/comment';

export interface ICommentRepository extends IGenericRepository<Comment> {
  findOne(id: string): Promise<Comment>;
  createOne(entity: Comment): Promise<Comment>;
  updateOne(id: string, entity: Partial<Comment>): Promise<void>;
  find(): Promise<Comment[]>;
  deleteOne(id: string): void;
  model(): PaginateModel<Comment>;
}
export const ICommentRepository = Symbol('ICommentRepository');
