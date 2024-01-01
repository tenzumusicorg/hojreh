import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  UploadedFile,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import FileService from 'src/infrastructure/file/file.service';
import AdminAuth from '../auth/decorator/admin-auth.decorator';
import { SuccessResponse } from 'src/infrastructure/middleware/interceptors/success.constant';

import UploadFileResponse, {
  UploadFileDto,
} from 'src/infrastructure/file/dto/upload-file.dto';
import ParseObjectIdPipe from 'src/infrastructure/middleware/pipes/parse-object-id.pipe';
import { CreateTagDto } from './dto/create-tag.dto';
import { CreateTagCommand } from './command/create-tag.command';
import { GetTagListDto, TagListDto } from './dto/tag-list.dto';
import { TagListQuery } from './query/tag-list.query';
import { TagDto } from './dto/tag.dto';
import { TagDetailQuery } from './query/tag-detail.query';
import { UpdateTagDto } from './dto/update-tag.dto';
import { UpdateTagCommand } from './command/update-tag.command';
import { DeleteTagCommand } from './command/delete-tag.command';
import { AddCategoryFaqCommand } from '../category/command/add-category-faq.command';
import { DeleteTagFaqCommand } from './command/delete-tag-faq.command';
import { UpdateTagFaqCommand } from './command/update-tag-faq.command';
import { MoveDownTagFaqCommand } from './command/movedown-tag.faq.command';
import ChangeTagFaqDto from './dto/tag-faq.dto';
import UpdateTagFaqDto from './dto/update-tag-faq.dto';
import AddTagFaqDto from './dto/add-tag-faq.dto';
import { GetTagsStatusDto, TagsStatusDto } from './dto/tag-status.dto';
import { TagStatusQuery } from './query/tag-status.query';

@ApiTags('Admin/Category')
@Controller()
export class TagController {
  constructor(
    private readonly fileService: FileService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: CreateTagDto })
  @ApiOkResponse({ type: SuccessResponse })
  async createTag(@Body() request: CreateTagDto): Promise<SuccessResponse> {
    this.commandBus.execute(
      new CreateTagCommand(
        request.sub_category_id,
        request.title_fa,
        request.title_en,
        request.thumbnail,
        request.banner,
        request.descriptions,
        request.seo_title,
        request.seo_description,
        request.faq_title,
      ),
    );
    return new SuccessResponse();
  }

  @Post('upload-thumbnail')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        thumbnail: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ type: UploadFileResponse })
  @UseInterceptors(FileInterceptor('thumbnail'))
  async uploadTagThumbnailImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileResponse> {
    let uploadDto = new UploadFileDto(
      file.buffer,
      file.originalname,
      file.mimetype,
    );
    let res = new UploadFileResponse();
    res.url = await this.fileService.uploadFile(uploadDto);
    res.mim_type = file.mimetype;
    res.size = file.size;
    res;
    return res;
  }

  @Post('upload-banner')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        banner: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ type: UploadFileResponse })
  @UseInterceptors(FileInterceptor('banner'))
  async uploadTagBannerImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileResponse> {
    let uploadDto = new UploadFileDto(
      file.buffer,
      file.originalname,
      file.mimetype,
    );
    let res = new UploadFileResponse();
    res.url = await this.fileService.uploadFile(uploadDto);
    res.mim_type = file.mimetype;
    res.size = file.size;
    res;
    return res;
  }

  @Post('list')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiOkResponse({
    type: TagListDto,
    description: '200. Success. Returns list of tags',
  })
  @HttpCode(HttpStatus.OK)
  async getTagList(@Body() request: GetTagListDto): Promise<TagListDto> {
    return this.queryBus.execute(
      new TagListQuery(request.pagination, request.filter),
    );
  }

  @Post('get-status')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({
    type: GetTagsStatusDto,
  })
  @ApiOkResponse({ type: TagsStatusDto })
  async getTagStatus(
    @Body() request: GetTagsStatusDto,
  ): Promise<TagsStatusDto> {
    return this.queryBus.execute(new TagStatusQuery(request.tags));
  }

  @Get(':id')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiOkResponse({
    type: TagDto,
    description: '200. Success. Returns a tag detail',
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  async getTagDetail(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<TagDto> {
    return this.queryBus.execute(new TagDetailQuery(id));
  }

  @Patch()
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: UpdateTagDto })
  @ApiOkResponse({ type: SuccessResponse })
  async updateTag(@Body() request: UpdateTagDto) {
    this.commandBus.execute(
      new UpdateTagCommand(
        request.id,
        request.title_fa,
        request.title_en,
        request.thumbnail,
        request.banner,
        request.descriptions,
        request.seo_title,
        request.seo_description,
        request.faq_title,
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
  async deleteTag(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(new DeleteTagCommand(id));
    return new SuccessResponse();
  }

  @Post('faq-list/add')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: AddTagFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '201, Success',
  })
  @HttpCode(HttpStatus.OK)
  async addFAQItem(@Body() request: AddTagFaqDto): Promise<SuccessResponse> {
    this.commandBus.execute(
      new AddCategoryFaqCommand(
        request.tag_id,
        request.answer,
        request.question,
      ),
    );
    return new SuccessResponse();
  }

  @Delete('faq-list/delete')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: ChangeTagFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async deleteFaqItem(
    @Body() request: ChangeTagFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new DeleteTagFaqCommand(request.tag_id, request.id),
    );
    return new SuccessResponse();
  }

  @Patch('faq-list/update')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: UpdateTagFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async updateFaqItem(
    @Body() request: UpdateTagFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new UpdateTagFaqCommand(
        request.tag_id,
        request.id,
        request.answer,
        request.question,
      ),
    );
    return new SuccessResponse();
  }

  @Post('faq-list/move-up')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: ChangeTagFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async moveUpFaqItem(
    @Body() request: ChangeTagFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new MoveDownTagFaqCommand(request.tag_id, request.id),
    );
    return new SuccessResponse();
  }

  @Post('faq-list/move-down')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: ChangeTagFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async moveDownFaqItem(
    @Body() request: ChangeTagFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new MoveDownTagFaqCommand(request.tag_id, request.id),
    );
    return new SuccessResponse();
  }

  // @Patch('name-migration')
  // // @ApiBearerAuth()
  // // @Auth()
  // @ApiOkResponse({ type: SuccessResponse })
  // // @UseInterceptors(WrapResponseInterceptor)
  // async productNameMigration(): Promise<SuccessResponse> {
  //   await this.categoryService.categoryNameMigration();
  //   return new SuccessResponse();
  // }
}
