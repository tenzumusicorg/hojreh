import {
  Body,
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  UseInterceptors,
  Patch,
  Delete,
  Param,
  Get,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiExtraModels,
  ApiConsumes,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import CreateVideoDto, {
  CreateVideoResDto,
} from './dto/video/create-video.dto';
import { CreateVideoCommand } from './command/video/create-video.command';
import { VideoListDto } from './dto/video/get-videos-list.dto';
import { VideoListQuery } from './query/video/video-list.query';
import VideoDto from './dto/video/get-video-detail.dto';
import { VideoDetailQuery } from './query/video/video-detail.query';
import UpdateVideoDto, {
  UpdateVideoResDto,
} from './dto/video/update-video.dto';
import { UpdateVideoCommand } from './command/video/update-video.command';
import { DeleteVideoResDto } from './dto/video/delete-video.dto';
import { DeleteVideoCommand } from './command/video/delete-video.command';
import CreateCarouselDto, {
  CreateCarouselResDto,
} from './dto/carousel/create-carouesl.dto';
import { SuccessResponse } from 'src/infrastructure/middleware/interceptors/success.constant';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCarouselCommand } from './command/carousel/create-carousel.command';
import { UploadFileDto } from 'src/infrastructure/file/dto/upload-file.dto';
import AdminAuth from '../auth/decorator/admin-auth.decorator';
import WrapResponseInterceptor from 'src/infrastructure/middleware/interceptors/wrap-response.interceptor';
import FileService from 'src/infrastructure/file/file.service';
import { CarouselListDto } from './dto/carousel/get-carouesl-list.dto';
import { CarouselListQuery } from './query/carousel/carousel-list.query';
import CarouselDto from './dto/carousel/get-carouesl-detail.dto';
import ParseObjectIdPipe from 'src/infrastructure/middleware/pipes/parse-object-id.pipe';
import { CarouselDetailQuery } from './query/carousel/carousel-detail.query';
import UpdateCarouselDto, {
  UpdateCarouselResDto,
} from './dto/carousel/update-carousel.dto';
import { UpdateCarouselCommand } from './command/carousel/update-carousel.command';
import MoveUpCarouselDto, {
  MoveUpCarouselResDto,
} from './dto/carousel/move-up-carousel.dto';
import { MoveUpCarouselCommand } from './command/carousel/moveup-carousel.command';
import MoveDownCarouselDto, {
  MoveDownCarouselResDto,
} from './dto/carousel/move-down-carousel.dto';
import { MoveDownCarouselCommand } from './command/carousel/movedown-carousel.command';
import { DeleteCarouselResDto } from './dto/carousel/delete-carouesl.dto';
import { DeleteCarouselCommand } from './command/carousel/delete-carousel.command';
import UpdateBannerDto from './dto/banner/update-banner.dto';
import { UpdateBannerCommand } from './command/banner/update-banner.command';
import BannerDto, { BannerListDto } from './dto/banner/get-banner-detail.dto';
import { BannerListQuery } from './query/banner/banner-list.query';
import { BannerDetailQuery } from './query/banner/banner-detail.query';
import SetFooterContentDto, {
  SetFooterContentResDto,
} from './dto/set-footer.dto';
import { SetFooterCommand } from './command/set-footer.command';
import FooterContentDto from './dto/get-footer.dto';
import { FooterQuery } from './query/footer.query';
import SetAboutUsContentDto, {
  SetAboutUsContentResDto,
} from './dto/set-about-us.dto';
import { SetAboutUsCommand } from './command/set-about-us.command';
import AboutUsContentDto from './dto/get-about-us.dto';
import { ContactUsQuery } from './query/contact-us.query';
import { AboutUsQuery } from './query/about-us.query';
import SetContactUsContentDto, {
  SetContactUsContentResDto,
} from './dto/set-contact-us.dto';
import { SetContactUsCommand } from './command/set-contact-us.command';
import ContactUsContentDto from './dto/get-contact-us.dto';
import SetPolicyContentDto, {
  SetPolicyContentResDto,
} from './dto/set-policy-content.dto';
import { SetPolicyContentCommand } from './command/set-policy.command';
import PolicyContentDto from './dto/get-policy-content.dto';
import { PolicyContentQuery } from './query/policy-content.query';
import SetFAQContentDto, {
  SetFAQContentResDto,
} from './dto/faq/set-faq-content.dto';
import { SetFaqContentCommand } from './command/faq/set-faq-content.command';
import FaqContentDto from './dto/faq/get-faq-content.dto';
import { FaqContentQuery } from './query/faq/faq-content.query';
import AddFaqItemDto from './dto/faq/add-faq.dto';
import { AddFaqContentCommand } from './command/faq/add-faq.command';
import DeleteFaqItemDto from './dto/faq/delete-faq.dto';
import { DeleteFaqContentCommand } from './command/faq/delete-faq.command';
import UpdateFaqItemDto from './dto/faq/update-faq.dto';
import { UpdateFaqContentCommand } from './command/faq/update-fq.command';
import MoveFaqItemOrderUpDto from './dto/faq/change-faq-order-up.dto';
import { MoveDownFaqContentCommand } from './command/faq/movedown-faq.command';
import MoveFaqItemOrderDownDto from './dto/faq/change-faq-order-down.dto';
import { MoveUpFaqContentCommand } from './command/faq/moveup-faq.command';

@ApiTags('Admin/Statics')
@UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels()
@Controller()
@ApiBearerAuth()
@AdminAuth()
export default class StaticController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly fileService: FileService,
  ) {}

  @Post('video')
  @ApiBody({ type: CreateVideoDto })
  @ApiOkResponse({
    type: CreateVideoResDto,
    description: '201, Success',
  })
  @HttpCode(HttpStatus.CREATED)
  async createVideo(
    @Body() request: CreateVideoDto,
  ): Promise<CreateVideoResDto> {
    this.commandBus.execute(
      new CreateVideoCommand(
        request.title,
        request.category,
        request.cover,
        request.link,
        request.duration,
        request.category_link,
      ),
    );
    return new SuccessResponse();
  }

  @Get('video/list')
  @ApiOkResponse({
    type: VideoListDto,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async getVideosList(): Promise<VideoListDto> {
    return this.queryBus.execute(new VideoListQuery());
  }

  @Get('video/:id')
  @ApiOkResponse({
    type: VideoDto,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async getVideoDetail(@Param('id') id: string): Promise<VideoDto> {
    return this.queryBus.execute(new VideoDetailQuery(id));
  }

  @Patch('video')
  @ApiBody({ type: UpdateVideoDto })
  @ApiOkResponse({
    type: UpdateVideoResDto,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async updateVideo(
    @Body() request: UpdateVideoDto,
  ): Promise<UpdateVideoResDto> {
    this.commandBus.execute(
      new UpdateVideoCommand(
        request.video_id,
        request.title,
        request.category,
        request.cover,
        request.link,
        request.duration,
        request.category_link,
      ),
    );

    return new UpdateVideoResDto();
  }

  @Delete('video/:id')
  @ApiOkResponse({
    type: DeleteVideoResDto,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async deleteVideo(@Param('id') id: string): Promise<DeleteVideoResDto> {
    this.queryBus.execute(new DeleteVideoCommand(id));

    return new DeleteVideoResDto();
  }

  @Post('carousel')
  @ApiBody({ type: CreateCarouselDto })
  @ApiOkResponse({
    type: CreateCarouselResDto,
    description: '201, Success',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.CREATED)
  async createCarousel(
    @UploadedFile() uploadedFile: Express.Multer.File,
    @Body() request: CreateCarouselDto,
  ): Promise<CreateCarouselResDto> {
    let uploadDto = new UploadFileDto(
      uploadedFile.buffer,
      uploadedFile.originalname,
      uploadedFile.mimetype,
    );
    let fileUrl = await this.fileService.uploadFile(uploadDto);
    let file = await this.fileService.getFileDetail(fileUrl);
    this.commandBus.execute(
      new CreateCarouselCommand(
        request.title_fa,
        request.title_en,
        request.description_en,
        request.description_en,
        request.below_text_en,
        request.below_text_fa,
        file,
        request.link,
      ),
    );

    return new CreateCarouselResDto();
  }

  @Get('carousel/list')
  @ApiOkResponse({
    type: CarouselListDto,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async getCarouselList(): Promise<CarouselListDto> {
    return this.queryBus.execute(new CarouselListQuery());
  }

  @Get('carousel/:id')
  @ApiOkResponse({
    type: CarouselDto,
    description: '200, Success',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  @HttpCode(HttpStatus.OK)
  async getCarouselDetail(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<CarouselDto> {
    return this.queryBus.execute(new CarouselDetailQuery(id));
  }

  @Patch('carousel')
  @ApiBody({ type: UpdateCarouselDto })
  @ApiOkResponse({
    type: UpdateCarouselResDto,
    description: '200, Success',
  })
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'))
  async updateCarousel(
    @UploadedFile() uploadedFile: Express.Multer.File,
    @Body() request: UpdateCarouselDto,
  ): Promise<UpdateCarouselResDto> {
    let uploadDto = new UploadFileDto(
      uploadedFile.buffer,
      uploadedFile.originalname,
      uploadedFile.mimetype,
    );
    let fileUrl = await this.fileService.uploadFile(uploadDto);
    let file = await this.fileService.getFileDetail(fileUrl);
    this.commandBus.execute(
      new UpdateCarouselCommand(
        request.carousel_id,
        request.title_fa,
        request.title_en,
        request.description_en,
        request.description_en,
        request.below_text_en,
        request.below_text_fa,
        file,
        request.link,
      ),
    );

    return new UpdateCarouselResDto();
  }

  @Patch('carousel/move-up')
  @ApiBody({ type: MoveUpCarouselDto })
  @ApiOkResponse({
    type: MoveUpCarouselResDto,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async moveUpCarousel(
    @Body() request: MoveUpCarouselDto,
  ): Promise<MoveUpCarouselResDto> {
    this.commandBus.execute(new MoveUpCarouselCommand(request.carousel_id));

    return new MoveUpCarouselResDto();
  }

  @Patch('carousel/move-down')
  @ApiBody({ type: MoveDownCarouselDto })
  @ApiOkResponse({
    type: MoveDownCarouselResDto,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async moveDownCarousel(
    @Body() request: MoveDownCarouselDto,
  ): Promise<MoveDownCarouselResDto> {
    this.commandBus.execute(new MoveDownCarouselCommand(request.carousel_id));
    return new MoveDownCarouselResDto();
  }

  @Delete('carousel/:id')
  @ApiOkResponse({
    type: DeleteCarouselResDto,
    description: '200, Success',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  @HttpCode(HttpStatus.OK)
  async deleteCarousel(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<DeleteCarouselResDto> {
    this.commandBus.execute(new DeleteCarouselCommand(id));
    return new DeleteCarouselResDto();
  }

  @Post('banner/update')
  @ApiBody({ type: UpdateBannerDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '201, Success',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.CREATED)
  async updateBanner(
    @UploadedFile() uploadedFile: Express.Multer.File,
    @Body() request: UpdateBannerDto,
  ) {
    let uploadDto = new UploadFileDto(
      uploadedFile.buffer,
      uploadedFile.originalname,
      uploadedFile.mimetype,
    );
    let fileUrl = await this.fileService.uploadFile(uploadDto);
    let file = await this.fileService.getFileDetail(fileUrl);
    this.commandBus.execute(
      new UpdateBannerCommand(
        request.banner_id,
        request.title_fa,
        request.title_en,
        request.description_fa,
        request.description_en,
        file,
        request.link,
      ),
    );
    return new SuccessResponse();
  }

  @Get('banner/list')
  @ApiOkResponse({
    type: BannerListDto,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  async getBannerList(): Promise<BannerListDto> {
    return this.queryBus.execute(new BannerListQuery());
  }

  @Get('banner/:id')
  @ApiOkResponse({
    type: BannerDto,
    description: '200, Success',
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  async getBannerDetail(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<BannerDto> {
    return this.queryBus.execute(new BannerDetailQuery(id));
  }

  @Post('footer/set')
  @ApiBody({ type: SetFooterContentDto })
  @ApiOkResponse({
    type: SetFooterContentResDto,
    description: '201, Success',
  })
  @HttpCode(HttpStatus.OK)
  async setFooterContent(
    @Body() request: SetFooterContentDto,
  ): Promise<SetFooterContentResDto> {
    this.commandBus.execute(
      new SetFooterCommand(
        request.address,
        request.call_numbers,
        request.social_media,
      ),
    );
    return new SetFooterContentResDto();
  }

  @Get('footer/get')
  @ApiOkResponse({
    type: FooterContentDto,
    description: '200, Success, get footer contents',
  })
  @HttpCode(HttpStatus.OK)
  async getFooterContent(): Promise<FooterContentDto> {
    return this.queryBus.execute(new FooterQuery());
  }

  @Post('about-us-content/set')
  @ApiBody({ type: SetAboutUsContentDto })
  @ApiOkResponse({
    type: SetAboutUsContentResDto,
    description: '201, Success',
  })
  @HttpCode(HttpStatus.OK)
  async setAboutUsContent(
    @Body() request: SetAboutUsContentDto,
  ): Promise<SetAboutUsContentResDto> {
    this.commandBus.execute(new SetAboutUsCommand(request.content));
    return new SetAboutUsContentResDto();
  }

  @Get('about-us-content/get')
  @ApiOkResponse({
    type: AboutUsContentDto,
    description: '200, Success, get about us contents',
  })
  @HttpCode(HttpStatus.OK)
  async getAboutUsContent(): Promise<AboutUsContentDto> {
    return this.queryBus.execute(new AboutUsQuery());
  }

  @Post('contact-us-content/set')
  @ApiBody({ type: SetContactUsContentDto })
  @ApiOkResponse({
    type: SetContactUsContentResDto,
    description: '201, Success',
  })
  @HttpCode(HttpStatus.OK)
  async setContactUsContent(
    @Body() request: SetContactUsContentDto,
  ): Promise<SetContactUsContentResDto> {
    this.commandBus.execute(
      new SetContactUsCommand(
        request.address,
        request.work_hours,
        request.call_numbers,
      ),
    );
    return new SetContactUsContentResDto();
  }

  @Get('contact-us-content/get')
  @ApiOkResponse({
    type: ContactUsContentDto,
    description: '200, Success, get contact us contents',
  })
  @HttpCode(HttpStatus.OK)
  async getContactUsContent(): Promise<ContactUsContentDto> {
    return this.queryBus.execute(new ContactUsQuery());
  }

  @Post('policy-content/set')
  @ApiBody({ type: SetPolicyContentDto })
  @ApiOkResponse({
    type: SetPolicyContentResDto,
    description: '201, Success',
  })
  @HttpCode(HttpStatus.OK)
  async setPolicyContent(
    @Body() request: SetPolicyContentDto,
  ): Promise<SetPolicyContentResDto> {
    this.commandBus.execute(new SetPolicyContentCommand(request.content));
    return new SetPolicyContentResDto();
  }

  @Get('policy-content/get')
  @ApiOkResponse({
    type: PolicyContentDto,
    description: '200, Success, get faq contents',
  })
  @HttpCode(HttpStatus.OK)
  async getPolicyContent(): Promise<PolicyContentDto> {
    return this.queryBus.execute(new PolicyContentQuery());
  }

  @Post('faq-content/set')
  @ApiBody({ type: SetFAQContentDto })
  @ApiOkResponse({
    type: SetFAQContentResDto,
    description: '201, Success',
  })
  @HttpCode(HttpStatus.OK)
  async setFaqContent(
    @Body() request: SetFAQContentDto,
  ): Promise<SetFAQContentResDto> {
    this.commandBus.execute(new SetFaqContentCommand(request.content));
    return new SetFAQContentResDto();
  }

  @Get('faq-content/get')
  @ApiOkResponse({
    type: FaqContentDto,
    description: '200, Success, get faq contents',
  })
  @HttpCode(HttpStatus.OK)
  async getFaqContent(): Promise<FaqContentDto> {
    return this.queryBus.execute(new FaqContentQuery());
  }

  @Post('faq-list/add')
  @ApiBody({ type: AddFaqItemDto })
  @ApiOkResponse({
    type: SetFAQContentResDto,
    description: '201, Success',
  })
  @HttpCode(HttpStatus.OK)
  async addFAQItem(
    @Body() request: AddFaqItemDto,
  ): Promise<SetFAQContentResDto> {
    this.commandBus.execute(
      new AddFaqContentCommand(request.answer, request.question),
    );
    return new SetFAQContentResDto();
  }

  @Post('faq-list/delete')
  @ApiBody({ type: DeleteFaqItemDto })
  @ApiOkResponse({
    type: SetFAQContentResDto,
    description: '201, Success',
  })
  @HttpCode(HttpStatus.OK)
  async deleteFaqItem(
    @Body() request: DeleteFaqItemDto,
  ): Promise<SetFAQContentResDto> {
    this.commandBus.execute(new DeleteFaqContentCommand(request.id));
    return new SetFAQContentResDto();
  }

  @Post('faq-list/update')
  @ApiBody({ type: UpdateFaqItemDto })
  @ApiOkResponse({
    type: SetFAQContentResDto,
    description: '201, Success',
  })
  @HttpCode(HttpStatus.OK)
  async updateFaqItem(
    @Body() request: UpdateFaqItemDto,
  ): Promise<SetFAQContentResDto> {
    this.commandBus.execute(
      new UpdateFaqContentCommand(request.id, request.answer, request.question),
    );
    return new SetFAQContentResDto();
  }

  @Post('faq-list/move-up')
  @ApiBody({ type: MoveFaqItemOrderUpDto })
  @ApiOkResponse({
    type: SetFAQContentResDto,
    description: '201, Success',
  })
  @HttpCode(HttpStatus.OK)
  async moveUpFaqItem(
    @Body() request: MoveFaqItemOrderUpDto,
  ): Promise<SetFAQContentResDto> {
    this.commandBus.execute(new MoveUpFaqContentCommand(request.id));
    return new SetFAQContentResDto();
  }

  @Post('faq-content/move-down')
  @ApiBody({ type: MoveFaqItemOrderDownDto })
  @ApiOkResponse({
    type: SetFAQContentResDto,
    description: '201, Success',
  })
  @HttpCode(HttpStatus.OK)
  async moveDownFaqItem(
    @Body() request: MoveFaqItemOrderDownDto,
  ): Promise<SetFAQContentResDto> {
    this.commandBus.execute(new MoveDownFaqContentCommand(request.id));
    return new SetFAQContentResDto();
  }
}
