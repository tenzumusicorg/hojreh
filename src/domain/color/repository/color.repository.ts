import { Types, Model as MongooseModel, PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Color } from '../entity/color.entity';
import { IColorRepository } from '../interface/IColor.repository';

@Injectable()
export default class ColorRepository implements IColorRepository {
  constructor(
    @InjectModel('Color') private colorModel: MongooseModel<Color>,
    @InjectModel('Color')
    private pgModel: PaginateModel<Color>,
  ) {}

  async createOne(color: Color) {
    return await this.colorModel.create({
      _id: new Types.ObjectId(),
      ...color,
    });
  }

  async findOne(id: string) {
    return await this.colorModel.findOne({
      _id: id,
    });
  }

  async find() {
    return await this.colorModel.find();
  }
  async updateOne(id: string, entity: Partial<Color>) {
    await this.colorModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...entity,
        },
      },
    );
  }

  async deleteOne(id: string) {
    return await this.colorModel.deleteOne({
      _id: id,
    });
  }

  model() {
    return this.pgModel;
  }
}
