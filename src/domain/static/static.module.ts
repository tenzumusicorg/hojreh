import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import FileDomainModule from '../file/file.module';
import { VideoSchema } from './schemas/videos.schema';
import { CarouselSchema } from './schemas/carouesl.schema';
import { BannerSchema } from './schemas/banner.schema';
import { FooterContentSchema } from './schemas/footer.schema';
import { AboutUsContentSchema } from './schemas/about-us-content.schema';
import { ContactUsContentSchema } from './schemas/contact-us-content.schema';
import { PolicyContentSchema } from './schemas/policy-content.schema';
import { FAQContentSchema } from './schemas/faq-content.schema';
import StaticsRepository from './repository/statics.repository';

@Module({
  imports: [
    FileDomainModule,
    MongooseModule.forFeature([
      {
        name: 'Video',
        schema: VideoSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'Carousel',
        schema: CarouselSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'Banner',
        schema: BannerSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'FooterContent',
        schema: FooterContentSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'AboutUsContent',
        schema: AboutUsContentSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'ContactUsContent',
        schema: ContactUsContentSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'PolicyContent',
        schema: PolicyContentSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'FAQContent',
        schema: FAQContentSchema,
      },
    ]),
  ],
  providers: [StaticsRepository],
  controllers: [],
  exports: [StaticsRepository],
})
export default class StaticsDomainModule {}
