import {
  Body,
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import {
  ApiTags,
  ApiOkResponse,
  ApiExtraModels,
  ApiBearerAuth,
} from '@nestjs/swagger';
import SignInDto from './dto/sign-in.dto';
import SignUpReqDto, { SignUpResDto } from './dto/sign-up.dto';
import JwtTokensDto from './dto/jwt-tokens.dto';
import RefreshTokenReqDto from './dto/refresh-token.dto';
import { CommandBus } from '@nestjs/cqrs';
import { SignupCommand } from 'src/application/admin-panel/auth/command/sign-up.command';
import { ValidateUserOutput } from 'src/domain/auth/interface/validate-user-output.interface';
import AdminAuth from './decorator/admin-auth.decorator';
import { SigninCommand } from './command/sign-in.command';

@ApiTags('Admin/Auth')
@ApiExtraModels(JwtTokensDto)
@Controller()
export default class AuthController {
  constructor(private commandBus: CommandBus) {}

  @Post('sign-up')
  @ApiOkResponse({
    type: SignUpReqDto,
    description: '201, Success',
  })
  @ApiBearerAuth()
  @AdminAuth()
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Request() req: ExpressRequest,
    @Body() body: SignUpReqDto,
  ): Promise<SignUpResDto> {
    const admin = req.user as ValidateUserOutput;
    this.commandBus.execute(
      new SignupCommand(
        body.email,
        body.password,
        body.first_name,
        body.last_name,
        admin,
      ),
    );
    return new SignUpResDto();
  }

  @Post('sign-in')
  @ApiOkResponse({
    type: JwtTokensDto,
    description: 'Returns jwt tokens',
  })
  @HttpCode(HttpStatus.OK)
  async signin(@Body() body: SignInDto): Promise<JwtTokensDto> {
    return await this.commandBus.execute(
      new SigninCommand(body.email, body.password),
    );
  }

  @Post('refresh')
  @ApiOkResponse({
    description: '200, returns new jwt tokens',
  })
  async refreshToken(
    @Body() request: RefreshTokenReqDto,
  ): Promise<JwtTokensDto | never> {
    // return await this.authService.refreshToken(request);
    return new JwtTokensDto();
  }
}
