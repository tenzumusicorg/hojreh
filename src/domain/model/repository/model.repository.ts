import { Types, Model as MongooseModel, PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IModelRepository } from '../interface/IModel.repository';
import { Model } from '../entity/model.entity';

@Injectable()
export default class ModelRepository implements IModelRepository {
  constructor(
    @InjectModel('Model') private productModelModel: MongooseModel<Model>,
    @InjectModel('Model')
    private pgModel: PaginateModel<Model>,
  ) {}

  async createOne(model: Model) {
    return await this.productModelModel.create({
      _id: new Types.ObjectId(),
      ...model,
    });
  }

  async findOne(id: string) {
    return await this.productModelModel.findOne({
      _id: id,
    });
  }

  async find() {
    return await this.productModelModel.find();
  }
  async updateOne(id: string, entity: Partial<Model>) {
    await this.productModelModel.updateOne(
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
    return await this.productModelModel.deleteOne({
      _id: id,
    });
  }

  model() {
    return this.pgModel;
  }
}
