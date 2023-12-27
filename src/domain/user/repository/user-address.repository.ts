import { Types, Model, PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserAddress } from '../entity/user-address';
import { IUserAddressRepository } from '../interface/IUserAddress.repository';


@Injectable()
export default class UserAddressRepository implements IUserAddressRepository{
  constructor(
    @InjectModel("UserAddress")
    private userAddressModel: Model<UserAddress>,
    @InjectModel('UserAddress')
    private pgModel: PaginateModel<UserAddress>,
  ) {}

  async findOne(id: string): Promise<UserAddress> {
    return this.userAddressModel.findOne({ _id: id });
  }

  async findByUser(user_id: string): Promise<Array<UserAddress>> {
    return this.userAddressModel.find({ user_id })
  }

  async find(): Promise<Array<UserAddress>> {
    return this.userAddressModel.find()
  }

  public async deleteOne(id: string) {
     this.userAddressModel.deleteOne({ _id: id });
  }

  public async createOne(
    address: UserAddress,
  ): Promise<UserAddress> {
    const newAddress = await this.userAddressModel.create({
      _id: new Types.ObjectId(),
      ...address,
    });
    return newAddress.toJSON();
  }

  public async updateOne(id: string, data: Partial<UserAddress>) {
     this.userAddressModel.updateOne({ _id: id }, { $set: data });
  }

  model() {
    return this.pgModel;
  }
}
