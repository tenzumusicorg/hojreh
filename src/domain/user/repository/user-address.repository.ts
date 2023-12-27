import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import {
  PanelUserAddress,
  UserAddressDocument,
} from './schemas/user-address.schema';
import { CreateUserAddressDto } from './dto/add-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';

@Injectable()
export default class UserAddressRepository {
  constructor(
    @InjectModel(PanelUserAddress.name)
    private userAddressModel: Model<UserAddressDocument>,
  ) {}

  async findOneById(id: Types.ObjectId): Promise<PanelUserAddress | null> {
    return this.userAddressModel.findOne({ _id: id });
  }

  async findAll(user_id: Types.ObjectId): Promise<Array<PanelUserAddress>> {
    return this.userAddressModel.find({ user_id }).lean();
  }

  public async deleteUserAddress(id: Types.ObjectId) {
    return this.userAddressModel.deleteOne({ _id: id });
  }

  public async create(
    request: CreateUserAddressDto,
  ): Promise<PanelUserAddress> {
    const newAddress = await this.userAddressModel.create({
      _id: new Types.ObjectId(),
      ...request,
    });
    return newAddress.toJSON();
  }

  public async updateById(id: Types.ObjectId, data: UpdateUserAddressDto) {
    return this.userAddressModel.updateOne({ _id: id }, { $set: data });
  }
}
