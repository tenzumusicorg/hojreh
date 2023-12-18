import { Injectable } from '@nestjs/common';
import { LoginPayload } from 'src/domain/auth/interface/login-payload.interface';
import JwtTokensDto from './dto/jwt-tokens.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigValues } from 'src/infrastructure/config/app.configuration';
import AuthRepository from 'src/domain/auth/repository/auth.repository';

@Injectable()
export default class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly authRepository: AuthRepository,
  ) {}

  public async login(data: LoginPayload): Promise<JwtTokensDto> {
    const payload: LoginPayload = {
      id: data.id,
      email: data.email,
      role: data.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>(
        ConfigValues.ADMIN_ACCESS_TOKEN_EXPIRE_TIME,
      ),
      secret: this.configService.get<string>(
        ConfigValues.ADMIN_ACCESS_TOKEN_SECRET,
      ),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>(
        ConfigValues.ADMIN_REFRESH_TOKEN_EXPIRE_TIME,
      ),
      secret: this.configService.get<string>(
        ConfigValues.ADMIN_REFRESH_TOKEN_SECRET,
      ),
    });

    await this.authRepository.addRefreshToken(
      payload.email as string,
      refreshToken,
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
