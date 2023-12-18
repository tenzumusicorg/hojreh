import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailRequestDto } from './email.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(request: EmailRequestDto): Promise<boolean> {
    try {
      const {
        to,
        subject,
        code1,
        code2,
        upText,
        bottomText,
        linkUrl,
        linkText,
      } = request;
      await this.mailerService.sendMail({
        to,
        subject,
        template: 'mail',
        context: {
          upText,
          bottomText,
          code1,
          code2,
          linkText,
          linkUrl,
        },
      });      
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
