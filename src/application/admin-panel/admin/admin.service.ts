import { Inject, Injectable } from '@nestjs/common';
import adminsConstants from './constant/admins-constants';
import { IAdminRepository } from 'src/domain/admin/interface/IAdmin.repository';
import { hash } from 'bcrypt';
import { Admin } from 'src/domain/admin/entity/admin.entity';

@Injectable()
export default class AdminService {
  constructor(
    @Inject(IAdminRepository)
    private readonly adminsRepository: IAdminRepository,
  ) {}

  public async createSystemAdmin() {
    let foundSystemAdmin = await this.adminsRepository.findOneByEmail(
      adminsConstants.defaultAdmin.email,
    );
    const hashedPassword = await hash(
      adminsConstants.defaultAdmin.password,
      10,
    );

    if (!foundSystemAdmin) {
      let admin = new Admin();
      admin.email = adminsConstants.defaultAdmin.email;
      admin.password = hashedPassword;
      admin.first_name = adminsConstants.defaultAdmin.first_name;
      admin.last_name = adminsConstants.defaultAdmin.last_name;
      this.adminsRepository.createOne(admin);
    }
  }
}
