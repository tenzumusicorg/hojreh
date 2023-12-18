import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DecodedUser } from 'src/domain/auth/interface/decoded-user.interface';
import { IJwtDecode } from 'src/domain/auth/interface/jwt-decode-response.interface';

@Injectable()
export default class AdminJwtAccessStrategy extends PassportStrategy(
  Strategy,
  'admin-jwt',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ADMIN_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: IJwtDecode): Promise<DecodedUser> {
    return {
      id: payload.id,
      role: payload.role,
    };
  }
}
