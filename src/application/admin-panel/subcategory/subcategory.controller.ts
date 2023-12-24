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
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { CreateSubCategoryCommand } from './command/create-subcategory.command';
import UploadFileResponse, {
  UploadFileDto,
} from 'src/infrastructure/file/dto/upload-file.dto';
import { SubCategoryListDto } from './dto/subcategory-list.dto';
import { SubCategoryListQuery } from './query/subcategory-list.query';
import { SubCategoryDto } from './dto/subcategory.dto';
import ParseObjectIdPipe from 'src/infrastructure/middleware/pipes/parse-object-id.pipe';
import { SubCategoryDetailQuery } from './query/subcategory-detail.query';
import { UpdateSubCategoryDto } from './dto/update-subcategory.dto';
import { UpdateSubCategoryCommand } from './command/update-subcategory.command';
import { DeleteSubCategoryCommand } from './command/delete-subcategory.command';
import AddSubCategoryFaqDto from './dto/add-subcategory-faq.dto';
import { DeleteSubCategoryFaqCommand } from './command/delete-subcategory-faq.command';
import UpdateSubCategoryFaqDto from './dto/update-subcategory-faq.dto';
import { UpdateSubCategoryFaqCommand } from './command/update-subcategory-faq.command';
import ChangeSubCategoryFaqDto from './dto/subcategory-faq.dto';
import { MoveUpSubCategoryFaqCommand } from './command/moveup-subcategory-faq.command';
import { MoveDownSubCategoryFaqCommand } from './command/movedown-subcategory-faq.command';
import { AddSubCategoryFaqCommand } from './command/add-subcategory-faq.command';

@ApiTags('Admin/Category')
@Controller()
export class SubCategoryController {
  constructor(
    private readonly fileService: FileService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: CreateSubCategoryDto })
  @ApiOkResponse({ type: SuccessResponse })
  async createSubCategory(
    @Body() request: CreateSubCategoryDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new CreateSubCategoryCommand(
        request.category_id,
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
  async uploadSubCategoryThumbnailImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileResponse> {
    let uploadDto = new UploadFileDto(file);
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
  async uploadSubCategoryBannerImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileResponse> {
    let uploadDto = new UploadFileDto(file);
    let res = new UploadFileResponse();
    res.url = await this.fileService.uploadFile(uploadDto);
    res.mim_type = file.mimetype;
    res.size = file.size;
    res;
    return res;
  }

  @Get('list/:id')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiOkResponse({
    type: SubCategoryListDto,
    description: '200. Success. Returns list of subcategories',
  })
  @HttpCode(HttpStatus.OK)
  async getSubCategoryList(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<SubCategoryListDto> {
    return this.queryBus.execute(new SubCategoryListQuery(id));
  }

  @Get(':id')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiOkResponse({
    type: SubCategoryDto,
    description: '200. Success. Returns a sub category detail',
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  async getSubCategoryDetail(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<SubCategoryDto> {
    return this.queryBus.execute(new SubCategoryDetailQuery(id));
  }

  @Patch()
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: UpdateSubCategoryDto })
  @ApiOkResponse({ type: SuccessResponse })
  async updateSubCategory(@Body() request: UpdateSubCategoryDto) {
    this.commandBus.execute(
      new UpdateSubCategoryCommand(
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
  async deleteSubCategory(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(new DeleteSubCategoryCommand(id));
    return new SuccessResponse();
  }

  @Post('faq-list/add')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: AddSubCategoryFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '201, Success',
  })
  @HttpCode(HttpStatus.OK)
  async addFAQItem(
    @Body() request: AddSubCategoryFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new AddSubCategoryFaqCommand(
        request.sub_category_id,
        request.answer,
        request.question,
      ),
    );
    return new SuccessResponse();
  }

  @Delete('faq-list/delete')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: ChangeSubCategoryFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async deleteFaqItem(
    @Body() request: ChangeSubCategoryFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new DeleteSubCategoryFaqCommand(request.sub_category_id, request.id),
    );
    return new SuccessResponse();
  }

  @Patch('faq-list/update')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: UpdateSubCategoryFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async updateFaqItem(
    @Body() request: UpdateSubCategoryFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new UpdateSubCategoryFaqCommand(
        request.sub_category_id,
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
  @ApiBody({ type: ChangeSubCategoryFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async moveUpFaqItem(
    @Body() request: ChangeSubCategoryFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new MoveUpSubCategoryFaqCommand(request.sub_category_id, request.id),
    );
    return new SuccessResponse();
  }

  @Post('faq-list/move-down')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: ChangeSubCategoryFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async moveDownFaqItem(
    @Body() request: ChangeSubCategoryFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new MoveDownSubCategoryFaqCommand(request.sub_category_id, request.id),
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
