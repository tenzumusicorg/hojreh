import { IGenericRepository } from 'src/domain/database/generic-repository';
import { Admin } from '../entity/admin.entity';

export interface IAdminRepository extends IGenericRepository<Admin> {
  findOne(id: string): Promise<Admin>;
  createOne(entity: Admin): Promise<Admin>;
  updateOne(id: string, entity: Partial<Admin>): Promise<void>;
  find(): Promise<Admin[]>;
  deleteOne(id: string): void;
  findOneByEmail(email: string): Promise<Admin>;
  findOneByPhoneNumber(phoneNumber: string): Promise<Admin>;
}
export const IAdminRepository = Symbol('IAdminRepository');
