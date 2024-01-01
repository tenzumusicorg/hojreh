import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import StaticsDomainModule from 'src/domain/static/static.module';
import { CreateDefaultBannerHandler } from './command/banner/create-default-banner.command';
import { UpdateBannerHandler } from './command/banner/update-banner.command';
import { CreateCarouselHandler } from './command/carousel/create-carousel.command';
import { DeleteCarouselHandler } from './command/carousel/delete-carousel.command';
import { MoveDownCarouselHandler } from './command/carousel/movedown-carousel.command';
import { MoveUpCarouselHandler } from './command/carousel/moveup-carousel.command';
import { UpdateCarouselCommand } from './command/carousel/update-carousel.command';
import { AddFaqContentHandler } from './command/faq/add-faq.command';
import { FaqDomainModule } from 'src/domain/faq/faq.module';
import { DeleteFaqContentHandler } from './command/faq/delete-faq.command';
import { MoveDownFaqContentHandler } from './command/faq/movedown-faq.command';
import { MoveUpFaqContentHandler } from './command/faq/moveup-faq.command';
import { SetFaqContentHandler } from './command/faq/set-faq-content.command';
import { UpdateFaqContentHandler } from './command/faq/update-fq.command';
import { CreateVideoHandler } from './command/video/create-video.command';
import { DeleteVideoHandler } from './command/video/delete-video.command';
import { UpdateVideoHandler } from './command/video/update-video.command';
import { SetAboutUsHandler } from './command/set-about-us.command';
import { SetContactUsHandler } from './command/set-contact-us.command';
import { SetFooterHandler } from './command/set-footer.command';
import { SetPolicyContentHandler } from './command/set-policy.command';
import { PolicyContentHandler } from './query/policy-content.query';
import { BannerListHandler } from './query/banner/banner-list.query';
import { CarouselDetailHandler } from './query/carousel/carousel-detail.query';
import { CarouselListHandler } from './query/carousel/carousel-list.query';
import { FaqContentHandler } from './query/faq/faq-content.query';
import { VideoDetailHandler } from './query/video/video-detail.query';
import { VideoListHandler } from './query/video/video-list.query';
import { AboutUsHandler } from './query/about-us.query';
import { ContactUsHandler } from './query/contact-us.query';
import { FooterDetailHandler } from './query/footer.query';
import { BannerDetailHandler } from './query/banner/banner-detail.query';

export const commandHandlers = [
  CreateDefaultBannerHandler,
  UpdateBannerHandler,
  CreateCarouselHandler,
  DeleteCarouselHandler,
  MoveDownCarouselHandler,
  MoveUpCarouselHandler,
  UpdateCarouselCommand,
  AddFaqContentHandler,
  DeleteFaqContentHandler,
  MoveDownFaqContentHandler,
  MoveUpFaqContentHandler,
  SetFaqContentHandler,
  UpdateFaqContentHandler,
  CreateVideoHandler,
  DeleteVideoHandler,
  UpdateVideoHandler,
  SetAboutUsHandler,
  SetContactUsHandler,
  SetFooterHandler,
  SetPolicyContentHandler,
];
export const queryHandlers = [
  BannerDetailHandler,
  BannerListHandler,
  CarouselDetailHandler,
  CarouselListHandler,
  FaqContentHandler,
  VideoDetailHandler,
  VideoListHandler,
  AboutUsHandler,
  ContactUsHandler,
  FooterDetailHandler,
  PolicyContentHandler,
];

@Module({
  imports: [CqrsModule, StaticsDomainModule, FaqDomainModule],
  controllers: [],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export default class StaticModule {}
