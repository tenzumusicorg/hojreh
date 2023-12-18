import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MailService } from 'src/infrastructure/mail/mail.service';
import { adminSignupEmailValues } from '../constant/admin-singup-email.constant';
import { ConfigService } from '@nestjs/config';
import { SignupCommand } from '../command/sign-up.command';

export class SendAdminSignupEmailEvent {
  constructor(public admin: SignupCommand) {}
}

@EventsHandler(SendAdminSignupEmailEvent)
export class SendAdminSignupEmailEventHandler
  implements IEventHandler<SendAdminSignupEmailEvent>
{
  constructor(
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  handle(event: SendAdminSignupEmailEvent) {
    this.mailService.sendEmail({
      to: event.admin.email,
      subject: adminSignupEmailValues.subject,
      upText: `${event.admin.first_name} ${adminSignupEmailValues.upText}`,
      bottomText: `${adminSignupEmailValues.bottomText}`,
      code1: `نام کاربری: ${event.admin.email}`,
      code2: `رمز عبور:${event.admin.password}`,
      linkText: `ورود به تنزوشاپ`,
      linkUrl: `${this.configService.get<string>('ADMIN_APP_HOST')!}‍‍‍‍‍‍`,
    });
  }
}
