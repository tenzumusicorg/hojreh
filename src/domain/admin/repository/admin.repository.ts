import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { AdminModel } from '../schema/admin.schema';
import { Admin } from '../entity/admin.entity';
import { RolesEnum } from '../../auth/constant/role.enum';
import { IAdminRepository } from '../interface/IAdmin.repository';
@Injectable()
export default class AdminsRepository implements IAdminRepository {
  constructor(@InjectModel('Admin') private adminsModel: Model<AdminModel>) {}

  public async createOne(admin: Admin): Promise<Admin> {
    const newUser = await this.adminsModel.create({
      _id: new Types.ObjectId(),
      email: admin.email,
      password: admin.password,
      role: RolesEnum.Admin,
      register_date: new Date(),
      first_name: admin.first_name,
      last_name: admin.last_name,
      created_by: admin.created_by,
    });

    return newUser.toJSON();
  }

  public async findOneByEmail(email: string): Promise<Admin | null> {
    return this.adminsModel
      .findOne({
        email,
      })
      .lean();
  }

  public async findOneByPhoneNumber(email: string): Promise<Admin | null> {
    return this.adminsModel
      .findOne({
        email,
      })
      .lean();
  }

  public async findOne(id: string): Promise<Admin | null> {
    return this.adminsModel
      .findOne(
        {
          _id: id,
        },
        { password: 0 },
      )
      .lean();
  }

  public async find(): Promise<Array<Admin>> {
    return this.adminsModel.find({}, { password: 0 }).lean();
  }

  public async updateOne(id: string, admin: Partial<Admin>) {
    await this.adminsModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...admin,
        },
      },
    );
  }

  async deleteOne(id: string) {
    return await this.adminsModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          is_deleted: true,
        },
      },
    );
  }
}
