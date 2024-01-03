import { Types, Model as MongooseModel, PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../interface/IProduct.repository';
import { Product } from '../entity/product';

@Injectable()
export default class ProductRepository implements IProductRepository {
  constructor(
    @InjectModel('Product')
    private productModel: MongooseModel<Product>,
    @InjectModel('Product')
    private pgModel: PaginateModel<Product>,
  ) {}

  async createOne(product: Product) {
    return await this.productModel.create({
      _id: new Types.ObjectId(),
      ...product,
    });
  }

  async findOne(id: string) {
    return await this.productModel.findOne({
      _id: id,
    });
  }

  async find() {
    return await this.productModel.find();
  }
  async updateOne(id: string, entity: Partial<Product>) {
    await this.productModel.updateOne(
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
    return await this.productModel.deleteOne({
      _id: id,
    });
  }

  model() {
    return this.pgModel;
  }
}
