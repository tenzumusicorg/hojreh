import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { compare } from 'bcrypt';
import { IAdminRepository } from 'src/domain/admin/interface/IAdmin.repository';
import { IBrandRepository } from 'src/domain/brand/interface/IBrand.repository';

export class DeleteAdminCommand {
  constructor(public id: string) {}
}

@CommandHandler(DeleteAdminCommand)
export class DeleteAdminHandler implements ICommandHandler<DeleteAdminCommand> {
  constructor(
    @Inject(IBrandRepository)
    private readonly brandRepository: IBrandRepository,
  ) {}

  async execute(command: DeleteAdminCommand): Promise<void> {
    // let foundAdmin = await this.adminsRepository.findOne(command.id);
    // if (!foundAdmin) {
    //   throw new NotFoundException();
    // }
    // await this.adminsRepository.deleteOne(foundAdmin.id);
  }
}
