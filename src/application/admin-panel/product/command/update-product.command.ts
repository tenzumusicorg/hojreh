import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBrandRepository } from 'src/domain/brand/interface/IBrand.repository';
import { ICategoryRepository } from 'src/domain/category/interface/ICategory.repository';
import { IColorRepository } from 'src/domain/color/interface/IColor.repository';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { IModelRepository } from 'src/domain/model/interface/IModel.repository';
import { ProductAvailability } from 'src/domain/product/entity/availability';
import { ProductColor } from 'src/domain/product/entity/color';
import { Feature } from 'src/domain/product/entity/feature';
import { Price } from 'src/domain/product/entity/price';
import { ProductImage } from 'src/domain/product/entity/product-image';
import { ProductVideo } from 'src/domain/product/entity/product-video';
import { Properties } from 'src/domain/product/entity/properties';
import { Rating } from 'src/domain/product/entity/rate';
import { IProductGroupRepository } from 'src/domain/product/interface/IProduct-group.repository';
import { IProductRepository } from 'src/domain/product/interface/IProduct.repository';
import { IPropertyIndexRepository } from 'src/domain/product/interface/IProperty-index.repository';
import { ISubCategoryRepository } from 'src/domain/subcategory/interface/ISubCategory.repository';
import { ITagRepository } from 'src/domain/tag/interface/ITag.repository';
import TagService from 'src/domain/tag/tag.service';
import FileService from 'src/infrastructure/file/file.service';
import {
  BadRequestExceptionMessage,
  NotFoundExceptionMessage,
} from 'src/infrastructure/middleware/exceptions/exception.constants';
import { ProductImageDto } from '../dto/product-image.dto';

export class UpdateProductCommand {
  constructor(
    public action_user: string,
    public product_id: string,
    public name: string,
    public seo_name_fa: string,
    public seo_name_en: string,
    public description: DualLanguageText,
    public model_id: string,
    public brand: string,
    public category: string,
    public subcategory: string,
    public color: ProductColor,
    public tags: Array<string>,
    public rating: Rating,
    public images: Array<ProductImageDto>,
    public price: Price,
    public availability: ProductAvailability,
    public videos: Array<ProductVideo>,
    public features: Array<Feature>,
    public properties: Array<Properties>,
    public admin_preferred_related_products: Array<string>,
    public is_draft: boolean,
    public is_published: boolean,
  ) {}
}

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @Inject(IProductRepository)
    private productRepo: IProductRepository,
    @Inject(IBrandRepository)
    private brandRepo: IBrandRepository,
    @Inject(IModelRepository)
    private modelRepo: IModelRepository,
    @Inject(ICategoryRepository)
    private categoryRepo: ICategoryRepository,
    @Inject(ISubCategoryRepository)
    private subCategoryRepo: ISubCategoryRepository,
    @Inject(ITagRepository)
    private tagRepo: ITagRepository,
    @Inject(IColorRepository)
    private colorRepository: IColorRepository,
    @Inject(IProductGroupRepository)
    private productGroupRepo: IProductGroupRepository,
    @Inject(IPropertyIndexRepository)
    private propertyIndexRepo: IPropertyIndexRepository,
    private fileService: FileService,
    private tagService: TagService,
  ) {}

  async execute(command: UpdateProductCommand): Promise<void> {
    let foundProduct = await this.productRepo.findOne(command.product_id);
    if (!foundProduct) throw new NotFoundException(NotFoundExceptionMessage);

    if (!!command.category) {
      let foundCategory = await this.categoryRepo.findOne(command.category);
      if (!foundCategory) throw new NotFoundException(NotFoundExceptionMessage);
      foundProduct.category = foundCategory.id;
    }
    if (!!command.subcategory) {
      let foundSubCategory = await this.subCategoryRepo.findOne(
        command.subcategory,
      );
      if (!foundSubCategory)
        throw new NotFoundException(NotFoundExceptionMessage);
      foundProduct.subcategory = foundSubCategory.id;
    }
    if (!!command.model_id) {
      let foundModel = await this.modelRepo.findOne(command.model_id);
      if (!foundModel) throw new NotFoundException(NotFoundExceptionMessage);
      foundProduct.model_id = foundModel.id;
    }
    if (!!command.brand) {
      let foundBrand = await this.brandRepo.findOne(command.brand);
      if (!foundBrand) throw new NotFoundException(NotFoundExceptionMessage);
      foundProduct.brand = foundBrand.id;
    }

    if (!!command.tags) {
      let foundTags = new Array<string>();
      if (command.is_published && !command.is_draft) {
        for await (const tag of command.tags) {
          let foundTag = await this.tagRepo.findOne(tag);
          if (!foundTag) throw new NotFoundException(NotFoundExceptionMessage);
          let checkTagIsComplete = this.tagService.checkTagIsComplete(foundTag);
          if (!checkTagIsComplete)
            throw new BadRequestException(BadRequestExceptionMessage);
          foundTags.push(foundTag.id);
        }
      } else if (!command.is_published && command.is_draft) {
        for await (const tag of command.tags) {
          let foundTag = await this.tagRepo.findOne(tag);
          if (!foundTag) throw new NotFoundException(NotFoundExceptionMessage);
          foundTags.push(foundTag.id);
        }
      } else {
        throw new BadRequestException(BadRequestExceptionMessage);
      }
      foundProduct.tags = foundTags;
    }

    if (!!command.name) foundProduct.name = command.name;
    if (!!command.seo_name_fa) foundProduct.seo_name.fa = command.seo_name_fa;
    if (!!command.seo_name_en) foundProduct.seo_name.en = command.seo_name_en;
    if (!!command.description) foundProduct.description = command.description;
    if (!!command.rating) foundProduct.rating = command.rating;
    if (!!command.price) foundProduct.price = command.price;
    if (!!command.availability) {
      foundProduct.availability = command.availability;
      if (foundProduct.availability.total_count === 0)
        foundProduct.availability.is_available = false;
    }
    if (!!command.color) foundProduct.color = command.color;

    if (!!command.features) foundProduct.features = command.features;
    if (!!command.properties) foundProduct.properties = command.properties;

    if (!!command.admin_preferred_related_products) {
      let foundRelatedProducts = new Array<string>();
      for await (const product of command.admin_preferred_related_products) {
        let foundRelatedProduct = await this.productRepo.findOne(product);
        if (!foundRelatedProduct)
          throw new NotFoundException(NotFoundExceptionMessage);
        foundRelatedProducts.push(foundRelatedProduct.id);
      }
      foundProduct.admin_preferred_related_products = foundRelatedProducts;
    }

    if (!!command.images && command.images.length > 0) {
      foundProduct.images = new Array<ProductImage>();
      for await (const image of command.images) {
        let foundImage = await this.fileService.getFileDetail(image.url);
        let foundThumbnail = await this.fileService.getFileDetail(
          image.thumbnail,
        );
        foundProduct.images.push({
          url: foundImage,
          thumbnail: foundThumbnail,
          is_primary: image.is_primary,
        });
      }
    }

    if (!!command.videos) {
      foundProduct.videos = command.videos;
    }
    foundProduct.last_update = new Date();
    foundProduct.updated_by = command.action_user;
    await this.productRepo.updateOne(foundProduct.id, foundProduct);
  }
}
