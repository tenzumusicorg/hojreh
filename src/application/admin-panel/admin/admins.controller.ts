import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetAdminListDto, AdminListDto } from './dto/admin-list.dto';
import { UpdateAdminReqDto, UpdateAdminResDto } from './dto/update-admin.dto';
import { DeleteAdminResDto } from './dto/delete-admin.dto';
import ParseObjectIdPipe from 'src/infrastructure/middleware/pipes/parse-object-id.pipe';
import AdminAuth from '../auth/decorator/admin-auth.decorator';
import { AdminDto } from './dto/admin.dto';
import WrapResponseInterceptor from 'src/infrastructure/middleware/interceptors/wrap-response.interceptor';
import { DecodedUser } from 'src/domain/auth/interface/decoded-user.interface';
import { CurrentUser } from 'src/infrastructure/middleware/decorators/current-user.decorator';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AdminProfileQuery } from './query/admin-profile.query';
import { AdminListQuery } from './query/admin-list.query';
import { UpdateAdminCommand } from './command/update-admin.command';
import { DeleteAdminCommand } from './command/delete-admin.command';

@ApiTags('Admin/Admins')
@ApiBearerAuth()
@AdminAuth()
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class AdminsController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @ApiOkResponse({
    type: AdminDto,
    description: '200. Success. Returns a user',
  })
  @ApiParam({ name: 'id', type: String })
  @Get('profile/:id')
  async getById(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<AdminDto> {
    return this.queryBus.execute(new AdminProfileQuery(id));
  }

  @ApiOkResponse({
    type: AdminDto,
    description: '200. Success. Returns a user',
  })
  @Get('profile')
  async getByToken(@CurrentUser() user: DecodedUser): Promise<AdminDto> {
    return this.queryBus.execute(new AdminProfileQuery(user.id));
  }

  @ApiOkResponse({
    type: AdminListDto,
    description: '200. Success. Returns a list of admins',
  })
  @Post('list')
  @HttpCode(HttpStatus.OK)
  async getAdminList(@Body() request: GetAdminListDto): Promise<AdminListDto> {
    return this.queryBus.execute(
      new AdminListQuery(
        request.page,
        request.limit,
        request.query,
        request.filter_status,
      ),
    );
  }

  @ApiOkResponse({
    type: UpdateAdminResDto,
    description: '200. Success. update admin profile',
  })
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async updateAdmin(
    @Body() body: UpdateAdminReqDto,
  ): Promise<UpdateAdminResDto> {
    this.commandBus.execute(
      new UpdateAdminCommand(
        body.admin_id,
        body.email,
        body.password,
        body.first_name,
        body.last_name,
        body.status,
      ),
    );
    let res = new UpdateAdminResDto();
    return res;
  }

  @ApiOkResponse({
    type: DeleteAdminResDto,
    description: '200. Success. delete admin (soft delete))',
  })
  @ApiParam({ name: 'id', type: String })
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteAdmin(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<DeleteAdminResDto> {
    this.commandBus.execute(new DeleteAdminCommand(id));
    let res = new DeleteAdminResDto();
    return res;
  }
}
