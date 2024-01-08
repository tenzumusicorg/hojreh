import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UploadProductImageResDto } from './dto/product-image.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import AdminAuth from '../auth/decorator/admin-auth.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { SuccessResponse } from 'src/infrastructure/middleware/interceptors/success.constant';
import WrapResponseInterceptor from 'src/infrastructure/middleware/interceptors/wrap-response.interceptor';
import { CreateProductCommand } from './command/create-product.command';
import { UploadFileDto } from 'src/infrastructure/file/dto/upload-file.dto';
import FileService from 'src/infrastructure/file/file.service';
import {
  GetProductListExcelReqDto,
  ProductSearchReqDto,
  ProductSearchResDto,
} from './dto/product-list.dto';
import { ProductListQuery } from './query/product-list.query';
import { GetProductDto, ProductDto } from './dto/product.dto';
import { ProductDetailQuery } from './query/product-detail.query';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductCommand } from './command/update-product.command';
import { IJwtDecode } from 'src/domain/auth/interface/jwt-decode-response.interface';
import { UpdateProductsPriceDto } from './dto/update-prices.dto';
import { UpdateProductPriceCommand } from './command/update-product-price.command';
import { Response } from 'express';
import { ProductExcelListQuery } from './query/product-excel-list.query';
import { UpdateProductPriceByExcelCommand } from './command/update-product-price-excel.command';

@ApiTags('Admin/products')
@Controller()
export default class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: CreateProductDto })
  @ApiOkResponse({ type: SuccessResponse })
  @UseInterceptors(WrapResponseInterceptor)
  async createProduct(
    @Body() request: CreateProductDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new CreateProductCommand(
        request.name,
        request.seo_name_fa,
        request.seo_name_en,
        request.description,
        request.model,
        request.brand,
        request.category,
        request.subcategory,
        request.color,
        request.tags,
        request.images,
        request.price,
        request.availability,
        request.product_group,
        request.videos,
        request.features,
        request.properties,
        request.admin_preferred_related_products,
        request.is_draft,
        request.is_published,
      ),
    );
    return new SuccessResponse();
  }

  @Post('upload-image')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ type: UploadProductImageResDto })
  @UseInterceptors(WrapResponseInterceptor)
  @UseInterceptors(FileInterceptor('image'))
  async uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    let uploadDto = new UploadFileDto(
      file.buffer,
      file.originalname,
      file.mimetype,
    );
    let url = await this.fileService.uploadFile(uploadDto);
    let response = new UploadProductImageResDto();
    response.url = url;
    response.thumbnail = url;
    return response;
  }

  @Post('list')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiOkResponse({
    type: ProductSearchResDto,
  })
  @ApiBody({ type: ProductSearchReqDto })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(WrapResponseInterceptor)
  async getProductList(
    @Body() body: ProductSearchReqDto,
  ): Promise<ProductSearchResDto> {
    return this.queryBus.execute(
      new ProductListQuery(
        body.query,
        body.pagination,
        body.sorting,
        body.filter,
      ),
    );
  }

  @Post('detail')
  @ApiOkResponse({
    type: ProductDto,
    description: '200. Success. Returns a product detail',
  })
  @ApiBearerAuth()
  @AdminAuth()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(WrapResponseInterceptor)
  async getProductDetail(@Body() body: GetProductDto): Promise<ProductDto> {
    return this.queryBus.execute(new ProductDetailQuery(body.slug, body.id));
  }

  @Patch()
  @ApiBody({ type: UpdateProductDto })
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBearerAuth()
  @AdminAuth()
  @UseInterceptors(WrapResponseInterceptor)
  async updateProduct(
    @Request() req: Express.Request,
    @Body() request: UpdateProductDto,
  ) {
    const admin = req.user as IJwtDecode;
    this.commandBus.execute(
      new UpdateProductCommand(
        admin.id,
        request.id,
        request.name,
        request.seo_name_fa,
        request.seo_name_en,
        request.description,
        request.model,
        request.brand,
        request.category,
        request.subcategory,
        request.color,
        request.tags,
        request.rating,
        request.images,
        request.price,
        request.availability,
        request.videos,
        request.features,
        request.properties,
        request.admin_preferred_related_products,
        request.is_draft,
        request.is_published,
      ),
    );
    return new SuccessResponse();
  }

  @Patch('update-price')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({ type: UpdateProductsPriceDto })
  @ApiOkResponse({ type: SuccessResponse })
  @UseInterceptors(WrapResponseInterceptor)
  async updateProductsPrice(@Body() request: UpdateProductsPriceDto) {
    this.commandBus.execute(new UpdateProductPriceCommand(request.products));
    return new SuccessResponse();
  }

  // @Delete(':id')
  // @ApiBearerAuth()
  // @Auth()
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  //   description: 'id of element',
  // })
  // @UseInterceptors(WrapResponseInterceptor)
  // async deleteProduct(
  //   @Param('id', new ParseObjectIdPipe()) id: Types.ObjectId,
  // ): Promise<SuccessResponse> {
  //   await this.updateService.deleteProduct(id);
  //   return new SuccessResponse();
  // }

  // @Post('/comments/list')
  // @ApiBearerAuth()
  // @AdminAuth()
  // @ApiBody({
  //   type: GetCommentListReqDto,
  //   description: `enum status values: CONFIRMED: ${CommentStatusEnum.CONFIRMED}, REJECTED:${CommentStatusEnum.REJECTED}`,
  // })
  // @ApiOkResponse({
  //   type: GetCommentListResDto,
  // })
  // @UseInterceptors(WrapResponseInterceptor)
  // async getComments(@Body() body: GetCommentListReqDto) {
  //   return await this.commentService.getComments(body);
  // }

  // @Patch('/comments/update')
  // @ApiBearerAuth()
  // @AdminAuth()
  // @ApiBody({
  //   type: UpdateCommentReqDto,
  // })
  // @ApiOkResponse({
  //   type: SuccessResponse,
  // })
  // @UseInterceptors(WrapResponseInterceptor)
  // async updateComment(@Body() body: UpdateCommentReqDto) {
  //   await this.commentService.updateComment(body);
  //   return new SuccessResponse();
  // }

  // @Patch('/comments/confirm')
  // @ApiBearerAuth()
  // @AdminAuth()
  // @ApiBody({
  //   type: ConfirmCommentReqDto,
  //   description: `enum status values: CONFIRMED: ${CommentStatusEnum.CONFIRMED}, REJECTED:${CommentStatusEnum.REJECTED}`,
  // })
  // @ApiOkResponse({
  //   type: SuccessResponse,
  // })
  // @UseInterceptors(WrapResponseInterceptor)
  // async confirmComment(@Body() body: ConfirmCommentReqDto) {
  //   await this.commentService.confirmComment(body);
  //   return new SuccessResponse();
  // }

  // @Patch('/comments/reject')
  // @ApiBearerAuth()
  // @AdminAuth()
  // @ApiBody({
  //   type: RejectCommentReqDto,
  //   description: `enum status values: CONFIRMED: ${CommentStatusEnum.CONFIRMED}, REJECTED:${CommentStatusEnum.REJECTED}`,
  // })
  // @ApiOkResponse({
  //   type: SuccessResponse,
  // })
  // @UseInterceptors(WrapResponseInterceptor)
  // async rejectComment(@Body() body: RejectCommentReqDto) {
  //   await this.commentService.rejectComment(body);
  //   return new SuccessResponse();
  // }

  // @Delete('comments/:id')
  // @ApiBearerAuth()
  // @AdminAuth()
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  //   description: 'id of element',
  // })
  // @UseInterceptors(WrapResponseInterceptor)
  // async deleteComment(
  //   @Param('id', new ParseObjectIdPipe()) id: Types.ObjectId,
  // ): Promise<SuccessResponse> {
  //   await this.commentService.deleteComment(id);
  //   return new SuccessResponse();
  // }

  // @Get('/user-comments/:id')
  // @ApiBearerAuth()
  // @AdminAuth()
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  //   description: 'id of element',
  // })
  // @ApiOkResponse({
  //   type: GetUserProductCommentsResDto,
  // })
  // @UseInterceptors(WrapResponseInterceptor)
  // async getUserComments(
  //   @Param('id', new ParseObjectIdPipe()) id: Types.ObjectId,
  // ): Promise<GetUserProductCommentsResDto> {
  //   return await this.commentService.getUserComments(id);
  // }

  @Post('excel/list')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiOkResponse({
    description: '200. Success. get products list excel file',
  })
  @HttpCode(HttpStatus.OK)
  async getProductsExcelList(
    @Body() request: GetProductListExcelReqDto,
    @Res() res: Response,
  ) {
    const excelBuffer: Buffer = await this.queryBus.execute(
      new ProductExcelListQuery(request.category),
    );

    const fileName: string = 'products.xlsx';

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.send(excelBuffer);
  }

  @Post('excel/update')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ type: UploadProductImageResDto })
  @UseInterceptors(FileInterceptor('file'))
  async uploadProductPriceByExcel(@UploadedFile() file: Express.Multer.File) {
    this.queryBus.execute(new UpdateProductPriceByExcelCommand(file.buffer));
    return new SuccessResponse();
  }
}
