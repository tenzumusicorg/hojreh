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
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCategoryCommand } from './command/create-category.command';
import UploadFileResponse, {
  UploadFileDto,
} from 'src/infrastructure/file/dto/upload-file.dto';
import { CategoryListDto } from './dto/category-list.dto';
import { CategoryListQuery } from './query/category-list.query';
import { CategoryDto } from './dto/category.dto';
import ParseObjectIdPipe from 'src/infrastructure/middleware/pipes/parse-object-id.pipe';
import { CategoryDetailQuery } from './query/category-detail.query';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateCategoryCommand } from './command/update-category.command';
import { DeleteCategoryCommand } from './command/delete-category.command';
import AddCategoryFaqDto from './dto/add-category-faq.dto';
import { AddCategoryFaqCommand } from './command/add-category-faq.command';
import { DeleteCategoryFaqCommand } from './command/delete-category-faq.command';
import UpdateCategoryFaqDto from './dto/update-category-faq.dto';
import { UpdateCategoryFaqCommand } from './command/update-category-faq.command';
import ChangeCategoryFaqDto from './dto/category-faq.dto';
import WrapResponseInterceptor from 'src/infrastructure/middleware/interceptors/wrap-response.interceptor';
import { MoveUpCategoryFaqCommand } from './command/moveup-category-faq.command';
import { MoveDownCategoryFaqCommand } from './command/movedown-category-faq.command';

@ApiTags('Admin/Category')
@Controller()
export class CategoryController {
  constructor(
    private readonly fileService: FileService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: CreateCategoryDto })
  @ApiOkResponse({ type: SuccessResponse })
  async createCategory(
    @Body() request: CreateCategoryDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new CreateCategoryCommand(
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
  async uploadCategoryThumbnailImage(
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
  async uploadCategoryBannerImage(
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

  @Get('list')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiOkResponse({
    type: CategoryListDto,
    description: '200. Success. Returns list of categories',
  })
  @HttpCode(HttpStatus.OK)
  async getCategoryList(): Promise<CategoryListDto> {
    return this.queryBus.execute(new CategoryListQuery());
  }

  @Get(':id')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiOkResponse({
    type: CategoryDto,
    description: '200. Success. Returns a category detail',
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  async getCategoryDetail(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<CategoryDto> {
    return this.queryBus.execute(new CategoryDetailQuery(id));
  }

  @Patch()
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: UpdateCategoryDto })
  @ApiOkResponse({ type: SuccessResponse })
  async updateCategory(@Body() request: UpdateCategoryDto) {
    this.commandBus.execute(
      new UpdateCategoryCommand(
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
  async deleteCategory(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(new DeleteCategoryCommand(id));
    return new SuccessResponse();
  }

  @Post('faq-list/add')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: AddCategoryFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '201, Success',
  })
  @HttpCode(HttpStatus.OK)
  async addFAQItem(
    @Body() request: AddCategoryFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new AddCategoryFaqCommand(
        request.category_id,
        request.answer,
        request.question,
      ),
    );
    return new SuccessResponse();
  }

  @Delete('faq-list/delete')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: ChangeCategoryFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async deleteFaqItem(
    @Body() request: ChangeCategoryFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new DeleteCategoryFaqCommand(request.category_id, request.id),
    );
    return new SuccessResponse();
  }

  @Patch('faq-list/update')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: UpdateCategoryFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async updateFaqItem(
    @Body() request: UpdateCategoryFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new UpdateCategoryFaqCommand(
        request.category_id,
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
  @ApiBody({ type: ChangeCategoryFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async moveUpFaqItem(
    @Body() request: ChangeCategoryFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new MoveUpCategoryFaqCommand(request.category_id, request.id),
    );
    return new SuccessResponse();
  }

  @Post('faq-list/move-down')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: ChangeCategoryFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async moveDownFaqItem(
    @Body() request: ChangeCategoryFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new MoveDownCategoryFaqCommand(request.category_id, request.id),
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
