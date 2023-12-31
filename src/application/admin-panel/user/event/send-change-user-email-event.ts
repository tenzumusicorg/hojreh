import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MailService } from 'src/infrastructure/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { userEmailUpdatedEmailValues } from 'src/domain/user/users.constants';

export class SendChangeUserEmailEvent {
  constructor(
    public first_name: string,
    public phone_number: string,
    public email: string,
  ) {}
}

@EventsHandler(SendChangeUserEmailEvent)
export class SendChangeUserEmailEventHandler
  implements IEventHandler<SendChangeUserEmailEvent>
{
  constructor(
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  handle(event: SendChangeUserEmailEvent) {
    this.mailService.sendEmail({
      to: event.email,
      subject: userEmailUpdatedEmailValues.subject,
      upText: `${event.first_name} ${userEmailUpdatedEmailValues.upText}`,
      bottomText: `${userEmailUpdatedEmailValues.bottomText}`,
      code1: `شماره تلفن: ${event.phone_number}`,
      linkText: `ورود به تنزوشاپ`,
      linkUrl: `${this.configService.get<string>('SHOP_APP_HOST')!}‍‍‍‍‍‍`,
    });
  }
}
