import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import AuthController from './auth.controller';
import { SignupHandler } from './command/sign-up.command';
import { SendAdminSignupEmailEventHandler } from './event/send-signup-email-event';
import AuthService from './auth.service';
import { SigninHandler } from './command/sign-in.command';
import AuthRepository from 'src/domain/auth/repository/auth.repository';
import AdminDomainModule from 'src/domain/admin/admin.module';
import AdminJwtAccessStrategy from './strategies/jwt-access.strategy';

export const commandHandlers = [SignupHandler, SigninHandler];
export const eventHandlers = [SendAdminSignupEmailEventHandler];

@Module({
  imports: [
    CqrsModule,
    AdminDomainModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    ...commandHandlers,
    ...eventHandlers,
    AuthService,
    AuthRepository,
    AdminJwtAccessStrategy,
  ],
  controllers: [AuthController],
  exports: [],
})
export default class AuthModule {}
