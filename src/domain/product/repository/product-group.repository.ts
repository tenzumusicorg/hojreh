import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model as MongooseModel, PaginateModel, Types } from 'mongoose';
import { ProductGroup } from '../entity/product-group';
import { IProductGroupRepository } from '../interface/IProduct-group.repository';

@Injectable()
export class ProductGroupRepository implements IProductGroupRepository {
  constructor(
    @InjectModel('ProductGroup')
    private productGroupModel: MongooseModel<ProductGroup>,
    @InjectModel('ProductGroup')
    private pgModel: PaginateModel<ProductGroup>,
  ) {}

  async createOne(productGroup: ProductGroup) {
    return await this.productGroupModel.create({
      _id: new Types.ObjectId(),
      ...productGroup,
    });
  }

  async findOne(id: string) {
    return await this.productGroupModel.findOne({
      _id: id,
    });
  }

  async find() {
    return await this.productGroupModel.find();
  }
  async updateOne(id: string, entity: Partial<ProductGroup>) {
    await this.productGroupModel.updateOne(
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
    return await this.productGroupModel.deleteOne({
      _id: id,
    });
  }

  model() {
    return this.pgModel;
  }
}
