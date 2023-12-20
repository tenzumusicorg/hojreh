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
import { GetModelListDto, ModelListDto } from './dto/model-list.dto';
import { ModelDto } from './dto/model-detail.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import AdminAuth from '../auth/decorator/admin-auth.decorator';
import ParseObjectIdPipe from 'src/infrastructure/middleware/pipes/parse-object-id.pipe';
import { CreateModelDto } from './dto/create-model.dto';
import { SuccessResponse } from 'src/infrastructure/middleware/interceptors/success.constant';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ModelDetailQuery } from './query/model-detail.query';
import { ModelListQuery } from './query/model-list.query';
import { CreateModelCommand } from './command/create-model.command';
import { UpdateModelCommand } from './command/update-model.command';
import { DeleteModelCommand } from './command/delete-model.command';

@ApiTags('Admin/Model')
@Controller()
export class ModelController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: CreateModelDto })
  @ApiOkResponse({ type: SuccessResponse })
  async createModel(@Body() request: CreateModelDto): Promise<SuccessResponse> {
    this.commandBus.execute(
      new CreateModelCommand(request.name, request.brand),
    );
    return new SuccessResponse();
  }

  @Post('list')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: GetModelListDto })
  @ApiOkResponse({ type: ModelListDto })
  async search(@Body() request: GetModelListDto): Promise<ModelListDto> {
    return this.queryBus.execute(
      new ModelListQuery(request.brand_id, request.query),
    );
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
  @ApiOkResponse({ type: ModelDto })
  async getModelDetail(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<ModelDto> {
    return this.queryBus.execute(new ModelDetailQuery(id));
  }

  @Patch()
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: UpdateModelDto })
  @ApiOkResponse({ type: SuccessResponse })
  async updateModel(@Body() request: UpdateModelDto): Promise<SuccessResponse> {
    this.commandBus.execute(
      new UpdateModelCommand(request.model_id, request.name, request.brand),
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
  async deleteModel(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(new DeleteModelCommand(id));
    return new SuccessResponse();
  }
}
