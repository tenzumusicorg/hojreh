import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MailService } from 'src/infrastructure/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserCommand } from '../command/create-user.command';
import { userCreatedEmailValues } from 'src/domain/user/users.constants';

export class SendCreatedUserEmailEvent {
  constructor(public user: CreateUserCommand) {}
}

@EventsHandler(SendCreatedUserEmailEvent)
export class SendCreatedUserEmailEventHandler
  implements IEventHandler<SendCreatedUserEmailEvent>
{
  constructor(
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  handle(event: SendCreatedUserEmailEvent) {
    this.mailService.sendEmail({
      to: event.user.email,
      subject: userCreatedEmailValues.subject,
      upText: `${event.user.first_name} ${userCreatedEmailValues.upText}`,
      bottomText: `${userCreatedEmailValues.bottomText}`,
      code1: `شماره تلفن: ${event.user.phone_number}`,
      linkText: `ورود به تنزوشاپ`,
      linkUrl: `${this.configService.get<string>('SHOP_APP_HOST')!}‍‍‍‍‍‍`,
    });
  }
}
