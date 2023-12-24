import { Types, Model as MongooseModel, PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ITagRepository } from '../interface/ITag.repository';
import { Tag } from '../entity/tag.entity';

@Injectable()
export default class TagRepository implements ITagRepository {
  constructor(
    @InjectModel('Tag') private tagModel: MongooseModel<Tag>,
    @InjectModel('Tag')
    private pgModel: PaginateModel<Tag>,
  ) {}

  async createOne(tag: Tag) {
    return await this.tagModel.create({
      _id: new Types.ObjectId(),
      ...tag,
    });
  }

  async findOne(id: string) {
    return await this.tagModel.findOne({
      _id: id,
    });
  }

  async find() {
    return await this.tagModel.find();
  }
  async updateOne(id: string, entity: Partial<Tag>) {
    await this.tagModel.updateOne(
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
    return await this.tagModel.deleteOne({
      _id: id,
    });
  }

  model() {
    return this.pgModel;
  }
}
