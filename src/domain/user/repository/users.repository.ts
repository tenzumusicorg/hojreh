import { Types, Model, PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User } from '../entity/user';
import { IUserRepository } from '../interface/IUser.repository';
@Injectable()
export default class UsersRepository implements IUserRepository {
  constructor(
    @InjectModel("User") private usersModel: Model<User>,
    @InjectModel('User')
    private pgModel: PaginateModel<User>,
  ) {}

  public async createOne(
   user:User
  ): Promise<User> {
    const newUser = await this.usersModel.create({
      _id: new Types.ObjectId(),
      ...user,
      country_code:' ',
      signup_complete: true,
      email_verified: true,
      });
    return newUser.toJSON();
  }

  async findOneByPhoneNumber(phone_number: string): Promise<User> {
    return this.usersModel.findOne({ phone_number: phone_number });
  }

  async findOne(id: string): Promise<User | null> {
    return this.usersModel
      .findOne({ _id: id })
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersModel.findOne({ email: email });
  }

  public async updateOne(id: string, data: Partial<User>) {
     this.usersModel.updateOne({ _id: id }, { $set: data });
  }

  public async find(){
    return await this.usersModel.find()
  }

  async deleteOne(id: string) {
    return await this.usersModel.deleteOne({
      _id: id,
    });
  }

  model() {
    return this.pgModel;
  }
}
