import { Types, Model, PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IBrandRepository } from '../interface/IBrand.repository';
import { Brand } from '../entity/brand.entity';

@Injectable()
export default class BrandRepository implements IBrandRepository {
  constructor(
    @InjectModel('Brand') private brandModel: Model<Brand>,
    @InjectModel('Brand')
    private pgModel: PaginateModel<Brand>,
  ) {}

  async createOne(brand: Brand) {
    return await this.brandModel.create({
      _id: new Types.ObjectId(),
      ...brand,
    });
  }

  async findOne(id: string) {
    return await this.brandModel.findOne({
      _id: id,
    });
  }

  async find() {
    return await this.brandModel.find().populate('logo');
  }
  async updateOne(id: string, brandDto: Partial<Brand>) {
    await this.brandModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...brandDto,
        },
      },
    );
  }

  async deleteOne(id: string) {
    return await this.brandModel.deleteOne({
      _id: id,
    });
  }

  model() {
    return this.pgModel;
  }
}
