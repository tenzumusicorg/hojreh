import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/domain/user/interface/IUser.repository';
import {
  EmailAlreadyExistsExceptionMessage,
  NotFoundExceptionMessage,
  PhoneAlreadyExistsExceptionMessage,
} from 'src/infrastructure/middleware/exceptions/exception.constants';
import { SendChangeUserEmailEvent } from '../event/send-change-user-email-event';

export class UpdateUserCommand {
  constructor(
    public user_id: string,
    public email: string,
    public phone_number: string,
    public first_name: string,
    public last_name: string,
    public national_code: string,
    public status: string,
    public avatar_image: string,
  ) {}
}
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private eventBus: EventBus,
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    let foundUser = await this.userRepository.findOne(command.user_id);
    if (!foundUser) {
      throw new NotFoundException(NotFoundExceptionMessage);
    }

    if (!!command.phone_number) {
      let userExistsWithPhoneNumber =
        await this.userRepository.findOneByPhoneNumber(command.phone_number);

      if (
        !!userExistsWithPhoneNumber &&
        userExistsWithPhoneNumber.id.toString() !== foundUser.id.toString()
      ) {
        throw new BadRequestException(PhoneAlreadyExistsExceptionMessage);
      }
    }

    if (!!command.email) {
      let userExistsWithEmail = await this.userRepository.findOneByEmail(
        command.email,
      );
      if (
        !!userExistsWithEmail &&
        userExistsWithEmail.id.toString() !== foundUser.id.toString()
      ) {
        throw new BadRequestException(EmailAlreadyExistsExceptionMessage);
      }
      this.eventBus.publish(
        new SendChangeUserEmailEvent(
          command.first_name,
          command.phone_number,
          command.email,
        ),
      );
    }
  }
}
