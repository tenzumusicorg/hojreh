import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtDecode } from 'src/domain/auth/interface/jwt-decode-response.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IJwtDecode => {
    const request = ctx.switchToHttp().getRequest();
    const jwtService = new JwtService();
    const secret = process.env.ACCESS_TOKEN_SECRET;

    const token =
      request.headers.authorization?.replace('Bearer ', '') ||
      request.cookies?.jwtToken;

    const decodedToken = jwtService.verify(token, { secret });

    return decodedToken;
  },
);
