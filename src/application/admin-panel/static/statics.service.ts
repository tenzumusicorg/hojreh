import { Types } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import StaticsRepository from './repo/statics.repo';
import CreateVideoReqDto, { CreateVideoResDto } from './dto/video/create-video.dto';
import GetVideoDetailResDto from './dto/video/get-video-detail.dto';
import UpdateVideoReqDto, { UpdateVideoResDto } from './dto/video/update-video.dto';
import { DeleteVideoResDto } from './dto/video/delete-video.dto';
import GetVideoListItemDto, {
  GetVideoListResDto,
} from './dto/video/get-videos-list.dto';
import {
  BadRequestExceptionMessage,
  NotFoundExceptionMessage,
} from 'src/constants/exception.constants';
import { DeleteCarouselResDto } from './dto/carousel/delete-carouesl.dto';
import UpdateCarouselReqDto, {
  CarouselDto,
  UpdateCarouselResDto,
} from './dto/carousel/update-carousel.dto';
import GetCarouselDetailResDto from './dto/carousel/get-carouesl-detail.dto';
import GetCarouselListItemDto, {
  GetCarouselListResDto,
} from './dto/carousel/get-carouesl-list.dto';
import CreateCarouselReqDto, {
  CreateCarouselResDto,
} from './dto/carousel/create-carouesl.dto';
import SetAboutUsContentReqDto, {
  SetAboutUsContentResDto,
} from './dto/set-about-us.dto';
import GetAboutUsContentResDto from './dto/get-about-us.dto';
import GetContactUsContentResDto from './dto/get-contact-us.dto';
import SetContactUsContentReqDto, {
  SetContactUsContentResDto,
} from './dto/set-contact-us.dto';
import SetPolicyContentReqDto, {
  SetPolicyContentResDto,
} from './dto/set-policy-content.dto';
import GetPolicyContentResDto from './dto/get-policy-content.dto';
import SetFAQContentReqDto, {
  SetFAQContentResDto,
} from './dto/faq/set-faq-content.dto';
import GetFaqContentResDto from './dto/faq/get-faq-content.dto';
import SetFooterContentReqDto, {
  SetFooterContentResDto,
} from './dto/set-footer.dto';
import GetFooterContentResDto from './dto/get-footer.dto';
import AddFaqItemReqDto from './dto/faq/add-faq.dto';
import UpdateFaqItemReqDto from './dto/faq/update-faq.dto';
import DeleteFaqItemReqDto from './dto/faq/delete-faq.dto';
import MoveFaqItemOrderUpReqDto from './dto/faq/change-faq-order-up.dto';
import MoveFaqItemOrderDownReqDto from './dto/faq/change-faq-order-down.dto';
import MoveUpCarouselReqDto, {
  MoveUpCarouselResDto,
} from './dto/carousel/move-up-carousel.dto';
import MoveDownCarouselReqDto, {
  MoveDownCarouselResDto,
} from './dto/carousel/move-down-carousel.dto';
import { CarouselBaseIndex } from './constants/carousel-constants';
import FileService from 'src/modules/app/file/file.service';
import { FileTypeEnum } from 'src/modules/app/file/constants/file-type.enum';
import { WEBSITE_BUCKET } from 'src/modules/app/file/constants/app-bucket.constant';
import UpdateBannerReqDto, { BannerDto } from './dto/banner/update-banner.dto';
import { BannerNames } from './constants/banner-constants';
import GetBannerDetailResDto, {
  GetBannerListResDto,
} from './dto/banner/get-banner-detail.dto';

@Injectable()
export default class StaticsService implements OnModuleInit {
  constructor(
    private readonly staticsRepository: StaticsRepository,
    private readonly fileService: FileService,
  ) {}

  async onModuleInit() {
    this.createDefaultBanners();
  }

  public async createVideo(
    request: CreateVideoReqDto,
  ): Promise<CreateVideoResDto> {
    await this.staticsRepository.createVideo(request);

    return new CreateVideoResDto();
  }

  public async getVideoList(): Promise<GetVideoListResDto> {
    let foundVideos = await this.staticsRepository.findAllVideos();
    let res = new GetVideoListResDto();

    res.data = foundVideos.map((video) => {
      let videoListItem = new GetVideoListItemDto();
      videoListItem.id = video._id;
      videoListItem.title = video.title;
      videoListItem.category = video.category;
      videoListItem.cover = video.cover;
      videoListItem.link = video.link;
      videoListItem.duration = video.duration;
      videoListItem.category_link = video.category_link;
      return videoListItem;
    });

    return res;
  }

  public async getVideoDetail(
    id: Types.ObjectId,
  ): Promise<GetVideoDetailResDto> {
    let foundVideo = await this.staticsRepository.findVideoById(id);
    if (!foundVideo) {
      throw new NotFoundException(NotFoundExceptionMessage);
    }

    let res = new GetVideoDetailResDto();
    res.id = foundVideo._id;
    res.title = foundVideo.title;
    res.category = foundVideo.category;
    res.cover = foundVideo.cover;
    res.link = foundVideo.link;
    res.duration = foundVideo.duration;
    res.category_link = foundVideo.category_link;

    return res;
  }

  public async updateVideo(
    request: UpdateVideoReqDto,
  ): Promise<UpdateVideoResDto> {
    let foundVideo = await this.staticsRepository.findVideoById(
      request.video_id,
    );
    if (!foundVideo) {
      throw new NotFoundException(NotFoundExceptionMessage);
    }

    await this.staticsRepository.updateVideo(request.video_id, { ...request });
    return new UpdateVideoResDto();
  }

  async deleteVideo(id: Types.ObjectId): Promise<DeleteVideoResDto> {
    let foundVideo = await this.staticsRepository.findVideoById(id);
    if (!foundVideo) {
      throw new NotFoundException(NotFoundExceptionMessage);
    }
    await this.staticsRepository.deleteVideo(id);
    return new DeleteVideoResDto();
  }

  public async createCarousel(
    request: CreateCarouselReqDto,
  ): Promise<CreateCarouselResDto> {
    let list = await this.staticsRepository.findAllCarousels();

    let carouselDto = new CarouselDto();
    carouselDto.title = { en: request.title_en, fa: request.title_fa };
    carouselDto.description = {
      en: request.description_en,
      fa: request.description_fa,
    };
    carouselDto.below_text = {
      en: request.below_text_en,
      fa: request.below_text_fa,
    };
    carouselDto.link = request.link;
    if (list.length != 0) {
      carouselDto.index = list[0].index + 1;
    } else {
      carouselDto.index = CarouselBaseIndex;
    }    
    carouselDto.image = await this.fileService.saveFile(
      request.image.buffer,
      request.image.originalname,
      WEBSITE_BUCKET,
      FileTypeEnum.IMAGE,
      request.image.mimetype
    );

    await this.staticsRepository.createCarousel(carouselDto);

    return new CreateCarouselResDto();
  }

  public async getCarouselList(): Promise<GetCarouselListResDto> {
    let foundCarousels = await this.staticsRepository.findAllCarousels();
    let res = new GetCarouselListResDto();
    res.data = new Array<GetCarouselListItemDto>();
    for await (const carousel of foundCarousels) {
      let carouselListItem = new GetCarouselListItemDto();
      carouselListItem.id = carousel._id;
      carouselListItem.title = carousel.title;
      carouselListItem.description = carousel.description;
      carouselListItem.image =   carousel.image?.url;
      carouselListItem.image_id =   carousel.image?._id;
      carouselListItem.below_text = carousel.below_text;
      carouselListItem.link = carousel.link;
      carouselListItem.index = carousel.index;
      res.data.push(carouselListItem);
    }

    return res;
  }

  public async getCarouselDetail(
    id: Types.ObjectId,
  ): Promise<GetCarouselDetailResDto> {
    let foundCarousel = await this.staticsRepository.findCarouselById(id);
    if (!foundCarousel) {
      throw new NotFoundException(NotFoundExceptionMessage);
    }

    let res = new GetCarouselDetailResDto();
    res.id = foundCarousel._id;
    res.title = foundCarousel.title;
    res.description = foundCarousel.description;
    res.image = foundCarousel.image?.url,
    res.image_id = foundCarousel.image?._id,
    res.link = foundCarousel.link;
    res.below_text = foundCarousel.below_text;

    return res;
  }

  public async updateCarousel(
    request: UpdateCarouselReqDto,
  ): Promise<UpdateCarouselResDto> {
    let foundCarousel = await this.staticsRepository.findCarouselById(
      request.carousel_id,
    );
    if (!foundCarousel) {
      throw new NotFoundException(NotFoundExceptionMessage);
    }

    let carouselDto = new CarouselDto();
    carouselDto.title = { en: request.title_en, fa: request.title_fa };
    carouselDto.description = {
      en: request.description_en,
      fa: request.description_fa,
    };
    carouselDto.below_text = {
      en: request.below_text_en,
      fa: request.below_text_fa,
    };
    carouselDto.link = request.link;

    if (!!request.image) {
      carouselDto.image = await this.fileService.saveFile(
        request.image.buffer,
        request.image.originalname,
        WEBSITE_BUCKET,
        FileTypeEnum.IMAGE,
        request.image.mimetype
      );
    }

    await this.staticsRepository.updateCarousel(request.carousel_id, {
      ...carouselDto,
    });
    return new UpdateCarouselResDto();
  }

  public async moveUpCarousel(
    request: MoveUpCarouselReqDto,
  ): Promise<MoveUpCarouselResDto> {
    let foundCarouselList = await this.staticsRepository.findAllCarousels();

    let foundCarouselIndex = foundCarouselList.findIndex((element) => {
      return element._id.toString() === request.carousel_id.toString();
    });
    if (foundCarouselIndex < -1) {
      throw new BadRequestException(BadRequestExceptionMessage);
    }

    let tempIndex = foundCarouselList[foundCarouselIndex].index;
    foundCarouselList[foundCarouselIndex].index =
      foundCarouselList[foundCarouselIndex - 1].index;
    foundCarouselList[foundCarouselIndex - 1].index = tempIndex;

    let movedUpCarouselDto = new CarouselDto();
    movedUpCarouselDto.index = foundCarouselList[foundCarouselIndex].index;

    let movedDownCarouselDto = new CarouselDto();
    movedDownCarouselDto.index =
      foundCarouselList[foundCarouselIndex - 1].index;

    await this.staticsRepository.updateCarousel(
      foundCarouselList[foundCarouselIndex]._id,
      movedUpCarouselDto,
    );
    await this.staticsRepository.updateCarousel(
      foundCarouselList[foundCarouselIndex - 1]._id,
      movedDownCarouselDto,
    );

    return new MoveUpCarouselResDto();
  }

  async moveDownCarousel(
    request: MoveDownCarouselReqDto,
  ): Promise<MoveDownCarouselResDto> {
    let foundCarouselList = await this.staticsRepository.findAllCarousels();

    let foundCarouselIndex = foundCarouselList.findIndex((element) => {
      return element._id.toString() === request.carousel_id.toString();
    });
    if (
      foundCarouselIndex === -1 ||
      foundCarouselIndex === foundCarouselList.length - 1
    ) {
      throw new BadRequestException(BadRequestExceptionMessage);
    }

    let tempIndex = foundCarouselList[foundCarouselIndex + 1].index;
    foundCarouselList[foundCarouselIndex + 1].index =
      foundCarouselList[foundCarouselIndex].index;
    foundCarouselList[foundCarouselIndex].index = tempIndex;

    let movedUpCarouselDto = new CarouselDto();
    movedUpCarouselDto.index = foundCarouselList[foundCarouselIndex + 1].index;

    let movedDownCarouselDto = new CarouselDto();
    movedDownCarouselDto.index = foundCarouselList[foundCarouselIndex].index;

    await this.staticsRepository.updateCarousel(
      foundCarouselList[foundCarouselIndex + 1]._id,
      movedUpCarouselDto,
    );
    await this.staticsRepository.updateCarousel(
      foundCarouselList[foundCarouselIndex]._id,
      movedDownCarouselDto,
    );

    return new MoveDownCarouselResDto();
  }

  async deleteCarousel(id: Types.ObjectId): Promise<DeleteCarouselResDto> {
    let foundCarousel = await this.staticsRepository.findCarouselById(id);
    if (!foundCarousel) {
      throw new NotFoundException(NotFoundExceptionMessage);
    }
    await this.staticsRepository.deleteCarousel(id);
    return new DeleteCarouselResDto();
  }

  public async createDefaultBanners() {
    let foundFirstBanner = await this.staticsRepository.findBannerByName(
      BannerNames[0].name,
    );
    let foundSecondBanner = await this.staticsRepository.findBannerByName(
      BannerNames[1].name,
    );

    if (!foundFirstBanner)
      await this.staticsRepository.createBanner({
        name: BannerNames[0].name,
        description: { en: ' ', fa: ' ' },
        link: ' ',
        title: { fa: ' ', en: ' ' },
      });

    if (!foundSecondBanner)
      await this.staticsRepository.createBanner({
        name: BannerNames[1].name,
        description: { en: ' ', fa: ' ' },
        link: ' ',
        title: { fa: ' ', en: ' ' },
      });
  }

  public async updateBanner(request: UpdateBannerReqDto) {
 let foundBanner = await this.staticsRepository.findBannerById(
      request.banner_id,
    );
    if (!foundBanner) throw new NotFoundException(NotFoundExceptionMessage);

    let bannerDto = new BannerDto();
    bannerDto.title = { en: request.title_en, fa: request.title_fa };
    bannerDto.description = {
      en: request.description_en,
      fa: request.description_fa,
    };
    bannerDto.link = request.link;
   let createdImage = await this.fileService.saveFile(
      request.image.buffer,
      request.image.originalname,
      WEBSITE_BUCKET,
      FileTypeEnum.IMAGE,
      request.image.mimetype
    );
    bannerDto.image = createdImage._id as any
    await this.staticsRepository.updateBanner(foundBanner._id, bannerDto);   
  }

  async getBannerDetail(id: Types.ObjectId) {
    let foundBanner = await this.staticsRepository.findBannerById(id);
    if (!foundBanner) throw new NotFoundException(NotFoundExceptionMessage);

    let res = new GetBannerDetailResDto();
    res.id = foundBanner._id;
    res.description = foundBanner.description;
    res.link = foundBanner.link;
    res.title = foundBanner.title;
    res.name = foundBanner.name;
    res.image = !!foundBanner.image ? foundBanner.image.url : ''
    res.image_id = !!foundBanner.image ? foundBanner.image._id : ''

    return res;
  }

  async getBannerList() {
    let foundBanners = await this.staticsRepository.findAllBanner();
    let response = new GetBannerListResDto();
    response.items = new Array<GetBannerDetailResDto>();
    for await (const banner of foundBanners) {
      let res = new GetBannerDetailResDto();
      res.id = banner._id;
      res.description = banner.description;
      res.link = banner.link;
      res.title = banner.title;
      res.name = banner.name;
      res.image = !!banner.image ? banner.image.url : '',
      res.image_id = !!banner.image ? banner.image._id : '',
      response.items.push(res);
    }
    return response;
  }

  async setFooterContent(
    request: SetFooterContentReqDto,
  ): Promise<SetFooterContentResDto> {
    await this.staticsRepository.setFooterContent(request);
    return new SetAboutUsContentResDto();
  }

  async getFooterContent(): Promise<GetFooterContentResDto> {
    let aboutUsContent = await this.staticsRepository.getFooterContent();
    let res = new GetFooterContentResDto();
    if (aboutUsContent) {
      res.address = aboutUsContent.address;
      res.social_media = aboutUsContent.social_media;
      res.call_numbers = aboutUsContent.call_numbers;
    }
    return res;
  }

  async setAboutUsContent(
    request: SetAboutUsContentReqDto,
  ): Promise<SetAboutUsContentResDto> {
    await this.staticsRepository.setAboutUsContent(request);
    return new SetAboutUsContentResDto();
  }

  async getAboutUsContent(): Promise<GetAboutUsContentResDto> {
    let aboutUsContent = await this.staticsRepository.getAboutUsContent();
    let res = new GetAboutUsContentResDto();
    if (aboutUsContent) {
      res.content = aboutUsContent.content;
    }
    return res;
  }

  async setContactUsContent(
    request: SetContactUsContentReqDto,
  ): Promise<SetContactUsContentResDto> {
    await this.staticsRepository.setContactUsContent(request);
    return new SetContactUsContentResDto();
  }

  async getContactUsContent(): Promise<GetContactUsContentResDto> {
    let contactUsContent = await this.staticsRepository.getContactUsContent();
    let res = new GetContactUsContentResDto();
    if (contactUsContent) {
      res.id = contactUsContent.id;
      res.address = contactUsContent.address;
      res.work_hours = contactUsContent.work_hours;
      res.call_numbers = contactUsContent.call_numbers;
    }
    return res;
  }

  async setPolicyContent(
    request: SetPolicyContentReqDto,
  ): Promise<SetPolicyContentResDto> {
    await this.staticsRepository.setPolicyContent(request);
    return new SetPolicyContentResDto();
  }

  async getPolicyContent(): Promise<GetPolicyContentResDto> {
    let policyContent = await this.staticsRepository.getPolicyContent();
    let res = new GetPolicyContentResDto();
    if (policyContent) {
      res.id = policyContent.id;
      res.content = policyContent.content;
    }
    return res;
  }

  async setFAQContent(
    request: SetFAQContentReqDto,
  ): Promise<SetFAQContentResDto> {
    let foundFaqContent = await this.staticsRepository.getFAQContent();

    if (!foundFaqContent) {
      await this.staticsRepository.createFAQContent(request);
    } else {
      foundFaqContent.content = request.content;
      await this.staticsRepository.updateFAQContent(
        foundFaqContent._id,
        foundFaqContent,
      );
    }

    return new SetFAQContentResDto();
  }

  async AddFaqItem(request: AddFaqItemReqDto): Promise<SetFAQContentResDto> {
    let foundFaqContent = await this.staticsRepository.getFAQContent();

    if (!foundFaqContent) {
      throw new BadRequestException(BadRequestExceptionMessage);
    } else {
      foundFaqContent.faq_list.push({ ...request, _id: new Types.ObjectId() });
      await this.staticsRepository.updateFAQContent(
        foundFaqContent._id,
        foundFaqContent,
      );
    }

    return new SetFAQContentResDto();
  }

  async UpdateFaqItem(
    request: UpdateFaqItemReqDto,
  ): Promise<SetFAQContentResDto> {
    let foundFaqContent = await this.staticsRepository.getFAQContent();

    if (!foundFaqContent) {
      throw new BadRequestException(NotFoundExceptionMessage);
    } else {
      let foundItem = foundFaqContent.faq_list.find((element) => {
        return element._id.toString() === request.id.toString();
      });
      if (!foundItem) {
        throw new BadRequestException(NotFoundExceptionMessage);
      } else {
        foundItem.answer = request.answer;
        foundItem.question = request.question;

        await this.staticsRepository.updateFAQContent(
          foundFaqContent._id,
          foundFaqContent,
        );
      }
    }

    return new SetFAQContentResDto();
  }

  async moveUpFaqItem(
    request: MoveFaqItemOrderUpReqDto,
  ): Promise<SetFAQContentResDto> {
    let foundFaqContent = await this.staticsRepository.getFAQContent();

    if (!foundFaqContent) {
      throw new BadRequestException(NotFoundExceptionMessage);
    } else {
      let itemIndex = foundFaqContent.faq_list.findIndex((element) => {
        return element._id.toString() === request.id.toString();
      });

      if (itemIndex < 1) {
        throw new BadRequestException(BadRequestExceptionMessage);
      } else {
        let temp = foundFaqContent.faq_list[itemIndex];
        foundFaqContent.faq_list[itemIndex] =
          foundFaqContent.faq_list[itemIndex - 1];
        foundFaqContent.faq_list[itemIndex - 1] = temp;

        await this.staticsRepository.updateFAQContent(
          foundFaqContent._id,
          foundFaqContent,
        );
      }
    }

    return new SetFAQContentResDto();
  }

  async moveDownFaqItem(
    request: MoveFaqItemOrderDownReqDto,
  ): Promise<SetFAQContentResDto> {
    let foundFaqContent = await this.staticsRepository.getFAQContent();

    if (!foundFaqContent) {
      throw new BadRequestException(NotFoundExceptionMessage);
    } else {
      let itemIndex = foundFaqContent.faq_list.findIndex((element) => {
        return element._id.toString() === request.id.toString();
      });

      if (
        itemIndex === -1 ||
        itemIndex === foundFaqContent.faq_list.length - 1
      ) {
        throw new BadRequestException(BadRequestExceptionMessage);
      } else {
        let temp = foundFaqContent.faq_list[itemIndex + 1];
        foundFaqContent.faq_list[itemIndex + 1] =
          foundFaqContent.faq_list[itemIndex];
        foundFaqContent.faq_list[itemIndex] = temp;

        await this.staticsRepository.updateFAQContent(
          foundFaqContent._id,
          foundFaqContent,
        );
      }
    }

    return new SetFAQContentResDto();
  }

  async deleteFaqItem(
    request: DeleteFaqItemReqDto,
  ): Promise<SetFAQContentResDto> {
    let foundFaqContent = await this.staticsRepository.getFAQContent();

    if (!foundFaqContent) {
      throw new BadRequestException(NotFoundExceptionMessage);
    } else {
      let itemIndex = foundFaqContent.faq_list.findIndex((element) => {
        return element._id.toString() === request.id;
      });
      if (itemIndex === -1) {
        throw new BadRequestException(NotFoundExceptionMessage);
      } else {
        foundFaqContent.faq_list.splice(itemIndex, 1);
        await this.staticsRepository.updateFAQContent(
          foundFaqContent._id,
          foundFaqContent,
        );
      }
    }
    return new SetFAQContentResDto();
  }

  async getFAQContent(): Promise<GetFaqContentResDto> {
    let faqContent = await this.staticsRepository.getFAQContent();
    let res = new GetFaqContentResDto();
    if (faqContent) {
      res.id = faqContent.id;
      res.content = faqContent.content;
      res.faq_list = faqContent.faq_list;
    }
    return res;
  }
}
