import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Video } from '../entity/videos';
import { Carousel } from '../entity/carouesl';
import { Banner } from '../entity/banner';
import { FooterContent } from '../entity/footer';
import { AboutUsContent } from '../entity/about-us-content';
import { ContactUsContent } from '../entity/contact-us-content';
import { PolicyContent } from '../entity/policy-content';
import { FAQContent } from '../entity/faq-content';
import { FAQItem } from 'src/domain/faq/entity/faq-item.entity';

@Injectable()
export default class StaticsRepository {
  constructor(
    @InjectModel('Video') private videoModel: Model<Video>,
    @InjectModel('Carousel') private carouselModel: Model<Carousel>,
    @InjectModel('Banner') private bannerModel: Model<Banner>,
    @InjectModel('FooterContent') private footerModel: Model<FooterContent>,
    @InjectModel('AboutUsContent')
    private aboutUsModel: Model<AboutUsContent>,
    @InjectModel('ContactUsContent')
    private contactUsModel: Model<ContactUsContent>,
    @InjectModel('PolicyContent')
    private policyModel: Model<PolicyContent>,
    @InjectModel('FAQContent')
    private faqModel: Model<FAQContent>,
  ) {}

  public async createVideo(request: Video): Promise<Video> {
    const newVideo = await this.videoModel.create({
      _id: new Types.ObjectId(),
      ...request,
    });

    return newVideo.toJSON();
  }

  public async findVideoById(id: string): Promise<Video | null> {
    return this.videoModel.findOne({
      _id: id,
    });
  }

  public async findAllVideos(): Promise<Array<Video>> {
    return this.videoModel.find();
  }

  public async updateVideo(id: string, video: Partial<Video>) {
    return await this.videoModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...video,
        },
      },
    );
  }

  async deleteVideo(id: string) {
    await this.videoModel.deleteOne({
      _id: id,
    });
  }

  public async createCarousel(request: Carousel): Promise<Carousel> {
    const newCarousel = await this.carouselModel.create({
      _id: new Types.ObjectId(),
      ...request,
    });

    return newCarousel.toJSON();
  }

  public async findCarouselById(id: string): Promise<Carousel | null> {
    return this.carouselModel.findOne({
      _id: id,
    });
  }

  public async findAllCarousels(): Promise<Array<Carousel>> {
    return this.carouselModel.find(
      {},
      ['id', 'title', 'image', 'description', 'index', 'link', 'below_text'],
      {
        sort: {
          index: 1,
        },
      },
    );
  }

  public async updateCarousel(id: string, carousel: Carousel) {
    return await this.carouselModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...carousel,
        },
      },
    );
  }

  async deleteCarousel(_id: Types.ObjectId) {
    await this.carouselModel.deleteOne({
      _id,
    });
  }

  public async createBanner(banner: Banner): Promise<Banner> {
    const newBanner = await this.bannerModel.create({
      _id: new Types.ObjectId(),
      ...banner,
    });

    return newBanner.toJSON();
  }

  public async findBannerByName(name: string): Promise<Banner | null> {
    return this.bannerModel
      .findOne({
        name,
      })
      .lean();
  }

  public async findBannerById(id: Types.ObjectId): Promise<Banner | null> {
    return this.bannerModel.findOne({
      _id: id,
    });
  }

  public async findAllBanner(): Promise<Array<Banner>> {
    return this.bannerModel.find().populate('image').lean();
  }

  public async updateBanner(id: string, bannerDto: Banner) {
    return await this.bannerModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...bannerDto,
        },
      },
    );
  }

  async setFooterContent(footerContent: FooterContent) {
    let foundContent = await this.footerModel.findOne();

    if (!foundContent) {
      await this.footerModel.create({
        ...footerContent,
        _id: new Types.ObjectId(),
      });
    } else {
      await this.footerModel.updateOne(
        { _id: foundContent._id },
        { ...footerContent },
      );
    }
  }

  async getFooterContent() {
    return await this.footerModel.findOne();
  }

  async setAboutUsContent(aboutUsContent: AboutUsContent) {
    let foundContent = await this.aboutUsModel.findOne();

    if (!foundContent) {
      await this.aboutUsModel.create({
        ...aboutUsContent,
        _id: new Types.ObjectId(),
      });
    } else {
      await this.aboutUsModel.updateOne(
        { _id: foundContent._id },
        { ...aboutUsContent },
      );
    }
  }

  async getAboutUsContent() {
    return await this.aboutUsModel.findOne();
  }

  async setContactUsContent(contactUsContent: ContactUsContent) {
    let foundContent = await this.contactUsModel.findOne();

    if (!foundContent) {
      await this.contactUsModel.create({
        ...contactUsContent,
        _id: new Types.ObjectId(),
      });
    } else {
      await this.contactUsModel.updateOne(
        { _id: foundContent._id },
        { ...contactUsContent },
      );
    }
  }

  async getContactUsContent() {
    return await this.contactUsModel.findOne();
  }

  async setPolicyContent(policyContent: PolicyContent) {
    let foundContent = await this.policyModel.findOne();

    if (!foundContent) {
      await this.policyModel.create({
        ...policyContent,
        _id: new Types.ObjectId(),
      });
    } else {
      await this.policyModel.updateOne(
        { _id: foundContent._id },
        { ...policyContent },
      );
    }
  }
  async getPolicyContent() {
    return await this.policyModel.findOne();
  }

  async createFAQContent(faqContent: FAQContent) {
    await this.faqModel.create({
      ...faqContent,
      faq_list: new Array<FAQItem>(),
      _id: new Types.ObjectId(),
    });
  }

  async updateFAQContent(id: string, faqContent: FAQContent) {
    await this.faqModel.updateOne(
      { _id: id },
      {
        $set: {
          faq_list: faqContent.faq_list,
          content: faqContent.content,
        },
      },
    );
  }

  async getFAQContent() {
    return await this.faqModel.findOne();
  }
}
