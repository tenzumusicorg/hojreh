import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, Types } from 'mongoose';
import { IPropertyIndexRepository } from '../interface/IProperty-index.repository';
import { PropertyIndex } from '../entity/property-index';

@Injectable()
export class PropertyIndexRepository implements IPropertyIndexRepository {
  constructor(
    @InjectModel('PropertyIndex')
    private propertyIndexModel: Model<PropertyIndex>,
    @InjectModel('PropertyIndex')
    private pgModel: PaginateModel<PropertyIndex>,
  ) {}

  async createOne(propertyIndex: PropertyIndex) {
    return await this.propertyIndexModel.create({
      _id: new Types.ObjectId(),
      ...propertyIndex,
    });
  }

  async findBySubCategory(subcategory_id: string) {
    return await this.propertyIndexModel
      .find({
        subcategory_id,
      })
      .lean();
  }
  async findOne(id: string) {
    return await this.propertyIndexModel.findOne({
      _id: id,
    });
  }

  async find() {
    return await this.propertyIndexModel.find();
  }
  async updateOne(id: string, entity: Partial<PropertyIndex>) {
    await this.propertyIndexModel.updateOne(
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
    return await this.propertyIndexModel.deleteOne({
      _id: id,
    });
  }

  model() {
    return this.pgModel;
  }
}
