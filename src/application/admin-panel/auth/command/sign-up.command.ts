import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ValidateUserOutput } from '../../../../domain/auth/interface/validate-user-output.interface';
import { hash } from 'bcrypt';
import { Admin } from 'src/domain/admin/entity/admin.entity';
import { SendAdminSignupEmailEvent } from '../event/send-signup-email-event';
import { IAdminRepository } from 'src/domain/admin/interface/IAdmin.repository';

export class SignupCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly first_name: string,
    public readonly last_name: string,
    public readonly admin: ValidateUserOutput,
  ) {}
}

@CommandHandler(SignupCommand)
export class SignupHandler implements ICommandHandler<SignupCommand> {
  constructor(
    private eventBus: EventBus,
    @Inject(IAdminRepository)
    private readonly adminsRepository: IAdminRepository,
  ) {}

  async execute(command: SignupCommand): Promise<void> {
    let foundAdmin = await this.adminsRepository.findOneByEmail(command.email);
    if (!!foundAdmin)
      throw new BadRequestException('admin already exists with this email');

    const hashedPassword = await hash(command.password, 10);
    let admin = new Admin();
    admin.email = command.email;
    admin.password = hashedPassword;
    admin.first_name = command.first_name;
    admin.last_name = command.last_name;
    // admin.created_by = command.admin.id;
    await this.adminsRepository.createOne(admin);

    this.eventBus.publish(new SendAdminSignupEmailEvent(command));
  }
}
