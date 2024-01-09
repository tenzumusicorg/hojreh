import { Types, Model as MongooseModel, PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ICommentRepository } from '../interface/IComment.repository';
import { Comment } from '../entity/Comment';

@Injectable()
export default class CommentRepository implements ICommentRepository {
  constructor(
    @InjectModel('Comment')
    private commentModel: MongooseModel<Comment>,
    @InjectModel('Comment')
    private pgModel: PaginateModel<Comment>,
  ) {}

  async createOne(comment: Comment) {
    return await this.commentModel.create({
      _id: new Types.ObjectId(),
      ...comment,
    });
  }

  async findOne(id: string) {
    return await this.commentModel.findOne({
      _id: id,
    });
  }

  async find() {
    return await this.commentModel.find();
  }
  async updateOne(id: string, entity: Partial<Comment>) {
    await this.commentModel.updateOne(
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
    return await this.commentModel.deleteOne({
      _id: id,
    });
  }

  model() {
    return this.pgModel;
  }
}
