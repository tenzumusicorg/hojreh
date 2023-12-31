import { Types, Model as MongooseModel, PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../interface/ICategory.repository';
import { Category } from '../entity/category.entity';

@Injectable()
export default class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectModel('Category') private categoryModel: MongooseModel<Category>,
    @InjectModel('Category')
    private pgModel: PaginateModel<Category>,
  ) {}

  async createOne(category: Category) {
    return await this.categoryModel.create({
      _id: new Types.ObjectId(),
      ...category,
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
  async updateOne(id: string, entity: Partial<Category>) {
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
