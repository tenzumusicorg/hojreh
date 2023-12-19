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
import { CommandBus } from '@nestjs/cqrs';
import { CreateBrandCommand } from './command/create-brand.command';
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
    // private readonly fileService: FileService,
    private readonly commandBus: CommandBus,
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

  // @Post('upload-logo')
  // @ApiBearerAuth()
  // @Auth()
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       logo: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({ type: UploadFileResponse })
  // @UseInterceptors(FileInterceptor('logo'))
  // async uploadBrandLogo(
  //   @Request() req: Express.Request,
  // ): Promise<UploadFileResponse> {
  //   if (req.file) {
  //     const file = req.file;
  //     let createdFile = await this.fileService.saveFile(
  //       file.buffer,
  //       file.originalname,
  //       WEBSITE_BUCKET,
  //       FileTypeEnum.IMAGE,
  //       file.mimetype
  //     );

  //     return new UploadFileResponse(createdFile._id);
  //   } else {
  //     throw new BadRequestException(BadRequestExceptionMessage);
  //   }
  // }

  // @Post('list')
  // // @ApiBearerAuth()
  // // @Auth()
  // @ApiOkResponse({
  //   type: GetBrandListResDto,
  //   description: '200. Success. Returns list of brands',
  // })
  // @HttpCode(HttpStatus.OK)
  // async getBrandsList(
  //   @Body() request: GetBrandListReqDto,
  // ): Promise<GetBrandListResDto> {
  //   return this.brandService.getBrandsList(request);
  // }

  // @Get(':id')
  // @ApiBearerAuth()
  // @Auth()
  // @ApiOkResponse({
  //   type: GetBrandDetailResDto,
  //   description: '200. Success. Returns a brand detail',
  // })
  // @HttpCode(HttpStatus.OK)
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  //   description: 'id of element',
  // })
  // async getBrandDetail(
  //   @Param('id', new ParseObjectIdPipe()) id: Types.ObjectId,
  // ): Promise<GetBrandDetailResDto> {
  //   return this.brandService.getBrandDetail(id);
  // }

  // @Patch()
  // @ApiBearerAuth()
  // @Auth()
  // @ApiBody({ type: UpdateBrandReqDto })
  // @ApiOkResponse({ type: SuccessResponse })
  // async updateBrand(@Body() request: UpdateBrandReqDto) {
  //   await this.brandService.updateBrand(request);
  //   return new SuccessResponse();
  // }

  // @Delete(':id')
  // @ApiBearerAuth()
  // @Auth()
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  //   description: 'id of element',
  // })
  // async deleteBrand(
  //   @Param('id', new ParseObjectIdPipe()) id: Types.ObjectId,
  // ): Promise<SuccessResponse> {
  //   await this.brandService.deleteBrand(id);
  //   return new SuccessResponse();
  // }

  // @Post('faq-list/add')
  // @ApiBearerAuth()
  // @Auth()
  // @ApiBody({ type: AddFaqItemReqDto })
  // @ApiOkResponse({
  //   type: SuccessResponse,
  //   description: '201, Success',
  // })
  // @HttpCode(HttpStatus.OK)
  // async addFAQItem(
  //   @Body() request: AddFaqItemReqDto,
  // ): Promise<SuccessResponse> {
  //   await this.brandService.AddFaqItem(request);
  //   return new SuccessResponse();
  // }

  // @Delete('faq-list/delete')
  // @ApiBearerAuth()
  // @Auth()
  // @ApiBody({ type: DeleteFaqItemReqDto })
  // @ApiOkResponse({
  //   type: SuccessResponse,
  //   description: '200, Success',
  // })
  // @HttpCode(HttpStatus.OK)
  // async deleteFaqItem(
  //   @Body() request: DeleteFaqItemReqDto,
  // ): Promise<SuccessResponse> {
  //   await this.brandService.deleteFaqItem(request);
  //   return new SuccessResponse();
  // }

  // @Patch('faq-list/update')
  // @ApiBearerAuth()
  // @Auth()
  // @ApiBody({ type: UpdateFaqItemReqDto })
  // @ApiOkResponse({
  //   type: SuccessResponse,
  //   description: '200, Success',
  // })
  // @HttpCode(HttpStatus.OK)
  // async updateFaqItem(
  //   @Body() request: UpdateFaqItemReqDto,
  // ): Promise<SuccessResponse> {
  //   await this.brandService.UpdateFaqItem(request);
  //   return new SuccessResponse();
  // }

  // @Post('faq-list/move-up')
  // @ApiBearerAuth()
  // @Auth()
  // @ApiBody({ type: MoveFaqItemOrderUpReqDto })
  // @ApiOkResponse({
  //   type: SuccessResponse,
  //   description: '200, Success',
  // })
  // @HttpCode(HttpStatus.OK)
  // async moveUpFaqItem(
  //   @Body() request: MoveFaqItemOrderUpReqDto,
  // ): Promise<SuccessResponse> {
  //   await this.brandService.moveUpFaqItem(request);
  //   return new SuccessResponse();
  // }

  // @Post('faq-list/move-down')
  // @ApiBearerAuth()
  // @Auth()
  // @ApiBody({ type: MoveFaqItemOrderDownReqDto })
  // @ApiOkResponse({
  //   type: SuccessResponse,
  //   description: '200, Success',
  // })
  // @HttpCode(HttpStatus.OK)
  // async moveDownFaqItem(
  //   @Body() request: MoveFaqItemOrderDownReqDto,
  // ): Promise<SuccessResponse> {
  //   await this.brandService.moveDownFaqItem(request);
  //   return new SuccessResponse();
  // }
}
