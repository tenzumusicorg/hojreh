import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminJwtAccessGuard extends AuthGuard('admin-jwt') {
  constructor(private readonly configService: ConfigService) {    
    super({
      secretOrKey: configService.get<string>('ADMIN_ACCESS_TOKEN_SECRET'),
    });
  }
}