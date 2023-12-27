import { IGenericRepository } from 'src/domain/database/generic-repository';
import { PaginateModel } from 'mongoose';
import { UserAddress } from '../entity/user-address';

export interface IUserAddressRepository extends IGenericRepository<UserAddress> {
  findOne(id: string): Promise<UserAddress>;
  createOne(entity: UserAddress): Promise<UserAddress>;
  updateOne(id: string, entity: Partial<UserAddress>): Promise<void>;
  find(): Promise<UserAddress[]>;
  deleteOne(id: string): void;
  model(): PaginateModel<UserAddress>;
}
export const IUserAddressRepository = Symbol('IUserAddressRepository');
