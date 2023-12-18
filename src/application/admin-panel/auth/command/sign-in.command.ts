import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { compare } from 'bcrypt';
import { IAdminRepository } from 'src/domain/admin/interface/IAdmin.repository';
import AuthService from '../auth.service';
import JwtTokensDto from '../dto/jwt-tokens.dto';

export class SigninCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}

@CommandHandler(SigninCommand)
export class SigninHandler implements ICommandHandler<SigninCommand> {
  constructor(
    @Inject(IAdminRepository)
    private readonly adminsRepository: IAdminRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(command: SigninCommand): Promise<JwtTokensDto> {
    const admin = await this.adminsRepository.findOneByEmail(command.email);
    if (!admin) throw new NotFoundException('admin not found');

    const passwordCompared = await compare(command.password, admin.password);

    if (!passwordCompared) throw new BadRequestException('incorrect password');

    return this.authService.login(admin);
  }
}
