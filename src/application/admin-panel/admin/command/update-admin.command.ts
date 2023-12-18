import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { hash } from 'bcrypt';
import { AdminStatusEnum } from 'src/domain/admin/constant/admin-status.enum';
import { IAdminRepository } from 'src/domain/admin/interface/IAdmin.repository';
import { BadRequestExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class UpdateAdminCommand {
  constructor(
    public admin_id: string,
    public email: string,
    public password: string,
    public first_name: string,
    public last_name: string,
    public status: AdminStatusEnum,
  ) {}
}

@CommandHandler(UpdateAdminCommand)
export class UpdateAdminHandler implements ICommandHandler<UpdateAdminCommand> {
  constructor(
    @Inject(IAdminRepository)
    private readonly adminsRepository: IAdminRepository,
  ) {}

  async execute(command: UpdateAdminCommand): Promise<void> {
    let foundAdmin = await this.adminsRepository.findOne(command.admin_id);
    if (!foundAdmin) {
      throw new NotFoundException();
    }

    if (!!command.email) {
      let checkEmailExists = await this.adminsRepository.findOneByEmail(
        command.email,
      );
      if (
        !!checkEmailExists &&
        checkEmailExists.id.toString() !== foundAdmin.id.toString()
      ) {
        throw new BadRequestException(BadRequestExceptionMessage);
      }
      foundAdmin.email = command.email;
    }

    if (!!command.password) {
      const hashedPassword = await hash(command.password, 10);
      foundAdmin.password = hashedPassword;
    }

    if (!!command.first_name) {
      foundAdmin.first_name = command.first_name;
    }

    if (!!command.last_name) {
      foundAdmin.last_name = command.last_name;
    }

    if (!!command.status) {
      foundAdmin.status = command.status;
    }
    await this.adminsRepository.updateOne(foundAdmin.id, foundAdmin);
  }
}
