import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBrandReqDto } from './dto/create-brand.dto';
import AdminAuth from '../auth/decorator/admin-auth.decorator';
import { SuccessResponse } from 'src/infrastructure/middleware/interceptors/success.constant';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBrandCommand } from './command/create-brand.command';
import UploadFileResponse, {
  UploadFileDto,
} from 'src/infrastructure/file/dto/upload-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import FileService from 'src/infrastructure/file/file.service';
import ParseObjectIdPipe from 'src/infrastructure/middleware/pipes/parse-object-id.pipe';
import { DeleteBrandCommand } from './command/delete-brand.command';
import { UpdateBrandReqDto } from './dto/update-brand.dto';
import { UpdateBrandCommand } from './command/update-brand.command';
import {
  GetBrandListReqDto,
  GetBrandListResDto,
} from './dto/get-brand-list.dto';
import { BrandListQuery } from './query/brand-list.query';
import { GetBrandDetailResDto } from './dto/get-brand-detail.dto';
import { BrandDetailQuery } from './query/brand-detail.query';
import AddBrandFaqDto from './dto/add-brand-faq.dto';
import ChangeBrandFaqDto from './dto/brand-faq.dto';
import { MoveDownBrandFaqCommand } from './command/moveup-brand.faq.command';
import { MoveUpBrandFaqCommand } from './command/movedown-brand-faq.command';
import UpdateBrandFaqDto from './dto/update-brand-faq.dto';
import { UpdateBrandFaqCommand } from './command/update-brand-faq.command';
import { DeleteBrandFaqCommand } from './command/delete-brand-faq.command';
import { AddBrandFaqCommand } from './command/add-brand-faq.command';
// import FileService from 'src/modules/app/file/file.service';
// import { BrandService } from './brand.service';
// import { SuccessResponse } from 'src/constants/success.constant';
// import { CreateBrandReqDto } from './dto/create-brand.dto';
// import { UploadFileResponse } from 'src/constants/upload-file-response';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { WEBSITE_BUCKET } from 'src/modules/app/file/constants/app-bucket.constant';
// import { FileTypeEnum } from 'src/modules/app/file/constants/file-type.enum';
// import { BadRequestExceptionMessage } from 'src/constants/exception.constants';
// import {
//   GetBrandListReqDto,
//   GetBrandListResDto,
// } from './dto/get-brand-list.dto';
// import { GetBrandDetailResDto } from './dto/get-brand-detail.dto';
// import ParseObjectIdPipe from '@pipes/parse-object-id.pipe';
// import { Types } from 'mongoose';
// import { UpdateBrandReqDto } from './dto/update-brand.dto';
// import AddFaqItemReqDto from './dto/add-faq.dto';
// import DeleteFaqItemReqDto from './dto/delete-faq.dto';
// import UpdateFaqItemReqDto from './dto/update-faq.dto';
// import MoveFaqItemOrderUpReqDto from './dto/change-faq-order-up.dto';
// import MoveFaqItemOrderDownReqDto from './dto/change-faq-order-down.dto';
// import Auth from '@decorators/admin-auth.decorator';

@ApiTags('Admin/Brand')
@Controller()
export class BrandController {
  constructor(
    private readonly fileService: FileService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: CreateBrandReqDto })
  @ApiOkResponse({ type: SuccessResponse })
  async createBrand(
    @Body() request: CreateBrandReqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new CreateBrandCommand(
        request.name_fa,
        request.name_en,
        request.logo,
        request.descriptions,
      ),
    );
    return new SuccessResponse();
  }

  @Post('upload-logo')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        logo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ type: UploadFileResponse })
  @UseInterceptors(FileInterceptor('logo'))
  async uploadBrandLogo(
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

  @Post('list')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiOkResponse({
    type: GetBrandListResDto,
    description: '200. Success. Returns list of brands',
  })
  @HttpCode(HttpStatus.OK)
  async getBrandsList(
    @Body() request: GetBrandListReqDto,
  ): Promise<GetBrandListResDto> {
    return this.queryBus.execute(
      new BrandListQuery(
        request.pagination.page,
        request.pagination.limit,
        request.query,
      ),
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiOkResponse({
    type: GetBrandDetailResDto,
    description: '200. Success. Returns a brand detail',
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  async getBrandDetail(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<GetBrandDetailResDto> {
    return this.queryBus.execute(new BrandDetailQuery(id));
  }

  @Patch()
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: UpdateBrandReqDto })
  @ApiOkResponse({ type: SuccessResponse })
  async updateBrand(@Body() request: UpdateBrandReqDto) {
    this.commandBus.execute(
      new UpdateBrandCommand(
        request.brand_id,
        request.name_fa,
        request.name_en,
        request.logo,
        request.descriptions,
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
  async deleteBrand(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(new DeleteBrandCommand(id));
    return new SuccessResponse();
  }

  @Post('faq-list/add')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: AddBrandFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '201, Success',
  })
  @HttpCode(HttpStatus.OK)
  async addFAQItem(@Body() request: AddBrandFaqDto): Promise<SuccessResponse> {
    this.commandBus.execute(
      new AddBrandFaqCommand(
        request.brand_id,
        request.answer,
        request.question,
      ),
    );
    return new SuccessResponse();
  }

  @Delete('faq-list/delete')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: ChangeBrandFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async deleteFaqItem(
    @Body() request: ChangeBrandFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new DeleteBrandFaqCommand(request.brand_id, request.id),
    );
    return new SuccessResponse();
  }

  @Patch('faq-list/update')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: UpdateBrandFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async updateFaqItem(
    @Body() request: UpdateBrandFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new UpdateBrandFaqCommand(
        request.brand_id,
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
  @ApiBody({ type: ChangeBrandFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async moveUpFaqItem(
    @Body() request: ChangeBrandFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new MoveUpBrandFaqCommand(request.brand_id, request.id),
    );
    return new SuccessResponse();
  }

  @Post('faq-list/move-down')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: ChangeBrandFaqDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async moveDownFaqItem(
    @Body() request: ChangeBrandFaqDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new MoveDownBrandFaqCommand(request.brand_id, request.id),
    );
    return new SuccessResponse();
  }
}
