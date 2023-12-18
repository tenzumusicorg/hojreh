import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validateEnvs } from './infrastructure/config/app.configuration';
import { MailModule } from './infrastructure/mail/mail.module';
import { AdminPanelModule } from './application/admin-panel/admin-panel.module';
import { RedisCacheModule } from './infrastructure/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvs,
    }),
    DatabaseModule,
    MailModule,
    RedisCacheModule,
    AdminPanelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
