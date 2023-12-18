import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module, OnModuleInit } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (cfg: ConfigService) => ({
        transport: {
          host: cfg.get('MAIL_SERVER_HOST'),
          port: 465,
          secure: true,
          auth: {
            user: cfg.get('MAIL_SERVER_USERNAME'),
            pass: cfg.get('MAIL_SERVER_PASSWORD'),
          },
        },
        defaults: {
          from: `"TenzuShop - No Reply" <${cfg.get('MAIL_SERVER_USERNAME')}>`,
        },
        template: {
          dir: `${process.cwd()}/src/infrastructure/mail/templates`,
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
      imports: undefined,
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
