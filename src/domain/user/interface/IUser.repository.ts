import { IGenericRepository } from 'src/domain/database/generic-repository';
import { PaginateModel } from 'mongoose';
import { User } from '../entity/user';

export interface IUserRepository extends IGenericRepository<User> {
  findOne(id: string): Promise<User>;
  createOne(entity: User): Promise<User>;
  updateOne(id: string, entity: Partial<User>): Promise<void>;
  findOneByPhoneNumber(phone:string): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  find(): Promise<User[]>;
  deleteOne(id: string): void;
  model(): PaginateModel<User>;
}
export const IUserRepository = Symbol('IUserRepository');
