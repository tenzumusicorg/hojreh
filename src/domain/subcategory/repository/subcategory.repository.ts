import { Types, Model as MongooseModel, PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ISubCategoryRepository } from '../interface/ISubCategory.repository';
import { SubCategory } from '../entity/subcategory.entity';

@Injectable()
export default class SubCategoryRepository implements ISubCategoryRepository {
  constructor(
    @InjectModel('SubCategory')
    private categoryModel: MongooseModel<SubCategory>,
    @InjectModel('SubCategory')
    private pgModel: PaginateModel<SubCategory>,
  ) {}

  async createOne(subcategory: SubCategory) {
    return await this.categoryModel.create({
      _id: new Types.ObjectId(),
      ...subcategory,
    });
  }

  async findOne(id: string) {
    return await this.categoryModel.findOne({
      _id: id,
    });
  }

  async find() {
    return await this.categoryModel.find();
  }
  async updateOne(id: string, entity: Partial<SubCategory>) {
    await this.categoryModel.updateOne(
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
    return await this.categoryModel.deleteOne({
      _id: id,
    });
  }

  model() {
    return this.pgModel;
  }
}
