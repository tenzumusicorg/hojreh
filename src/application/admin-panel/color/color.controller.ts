import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import AdminAuth from '../auth/decorator/admin-auth.decorator';
import { SuccessResponse } from 'src/infrastructure/middleware/interceptors/success.constant';
import ParseObjectIdPipe from 'src/infrastructure/middleware/pipes/parse-object-id.pipe';
import { ColorListDto } from './dto/color-list.dto';
import { ColorDto } from './dto/color.dto';
import { CreateColorCommand } from './command/create-color.command';
import { ColorListQuery } from './query/color-list.query';
import { ColorDetailQuery } from './query/color-detail.query';
import { UpdateColorCommand } from './command/update-color.command';
import { DeleteColorCommand } from './command/delete-color.command';

@ApiTags('Admin/Color')
@Controller()
export class ColorController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: CreateColorDto })
  @ApiOkResponse({ type: SuccessResponse })
  async createColor(@Body() request: CreateColorDto): Promise<SuccessResponse> {
    this.commandBus.execute(
      new CreateColorCommand(request.color_en, request.color_fa, request.link),
    );

    return new SuccessResponse();
  }

  @Get('list')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiOkResponse({ type: ColorListDto })
  async getColorList(): Promise<ColorListDto> {
    return this.queryBus.execute(new ColorListQuery());
  }

  @Get(':id')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  @ApiOkResponse({ type: ColorDto })
  async getColorDetail(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<ColorDto> {
    return this.queryBus.execute(new ColorDetailQuery(id));
  }

  @Patch()
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: UpdateColorDto })
  @ApiOkResponse({ type: SuccessResponse })
  async updateColor(@Body() request: UpdateColorDto): Promise<SuccessResponse> {
    this.commandBus.execute(
      new UpdateColorCommand(
        request.color_id,
        request.color_en,
        request.color_fa,
        request.link,
      ),
    );
    return new SuccessResponse();
  }

  @Delete(':id')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  @ApiOkResponse({ type: SuccessResponse })
  async deleteColor(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(new DeleteColorCommand(id));
    return new SuccessResponse();
  }
}
