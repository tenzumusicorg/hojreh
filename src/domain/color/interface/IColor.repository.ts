import { IGenericRepository } from 'src/domain/database/generic-repository';
import { PaginateModel } from 'mongoose';
import { Color } from '../entity/color.entity';

export interface IColorRepository extends IGenericRepository<Color> {
  findOne(id: string): Promise<Color>;
  createOne(entity: Color): Promise<Color>;
  updateOne(id: string, entity: Partial<Color>): Promise<void>;
  find(): Promise<Color[]>;
  deleteOne(id: string): void;
  model(): PaginateModel<Color>;
}
export const IColorRepository = Symbol('IColorRepository');
