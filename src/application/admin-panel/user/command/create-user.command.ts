import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { User } from 'src/domain/user/entity/user';
import { IUserRepository } from 'src/domain/user/interface/IUser.repository';
import { BadRequestExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import { SendCreatedUserEmailEvent } from '../event/send-craeted-user-email-event';

export class CreateUserCommand {
  constructor(
    public email: string,
    public first_name: string,
    public last_name: string,
    public phone_number: string,
    public avatar_image: string,
  ) {}
}
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    let userExistsWithEmail = await this.userRepository.findOneByEmail(
      command.email,
    );
    let userExistsWithPhoneNumber =
      await this.userRepository.findOneByPhoneNumber(command.phone_number);

    if (!!userExistsWithEmail || !!userExistsWithPhoneNumber)
      throw new BadRequestException(BadRequestExceptionMessage);

    let user = new User();
    user.phone_number = command.phone_number;
    user.email = command.email;
    user.first_name = command.first_name;
    user.last_name = command.last_name;
    user.avatar_image = command.avatar_image;
    await this.userRepository.createOne(user);

    this.eventBus.publish(new SendCreatedUserEmailEvent(command));
  }
}
