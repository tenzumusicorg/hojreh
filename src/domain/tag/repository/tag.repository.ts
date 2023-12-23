import { Types, Model as MongooseModel, PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ITagRepository } from '../interface/ITag.repository';
import { Tag } from '../entity/tag.entity';

@Injectable()
export default class TagRepository implements ITagRepository {
  constructor(
    @InjectModel('Tag') private categoryModel: MongooseModel<Tag>,
    @InjectModel('Tag')
    private pgModel: PaginateModel<Tag>,
  ) {}

  async createOne(tag: Tag) {
    return await this.categoryModel.create({
      _id: new Types.ObjectId(),
      ...tag,
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
  async updateOne(id: string, entity: Partial<Tag>) {
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
