import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import ShortUniqueId from 'short-unique-id';
import { IBrandRepository } from 'src/domain/brand/interface/IBrand.repository';
import { ICategoryRepository } from 'src/domain/category/interface/ICategory.repository';
import { IColorRepository } from 'src/domain/color/interface/IColor.repository';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { IModelRepository } from 'src/domain/model/interface/IModel.repository';
import { TenzuBarCode } from 'src/domain/product/constant/tenzu-barcode';
import { ProductAvailability } from 'src/domain/product/entity/availability';
import { ProductColor } from 'src/domain/product/entity/color';
import { Feature } from 'src/domain/product/entity/feature';
import { Price } from 'src/domain/product/entity/price';
import { Product } from 'src/domain/product/entity/product';
import { ProductGroup } from 'src/domain/product/entity/product-group';
import { ProductImage } from 'src/domain/product/entity/product-image';
import { ProductVideo } from 'src/domain/product/entity/product-video';
import {
  Properties,
  PropertiesItemDualLanguage,
} from 'src/domain/product/entity/properties';
import { PropertyIndex } from 'src/domain/product/entity/property-index';
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

export class CreateProductCommand {
  constructor(
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
    public images: Array<ProductImageDto>,
    public price: Price,
    public availability: ProductAvailability,
    public product_group: string,
    public videos: Array<ProductVideo>,
    public features: Array<Feature>,
    public properties: Array<Properties>,
    public admin_preferred_related_products: Array<string>,
    public is_draft: boolean,
    public is_published: boolean,
  ) {}
}

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
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

  async execute(command: CreateProductCommand): Promise<void> {
    let foundCategory = await this.categoryRepo.findOne(command.category);
    let foundSubCategory = await this.subCategoryRepo.findOne(
      command.subcategory,
    );
    let foundModel = await this.modelRepo.findOne(command.model_id);
    let foundBrand = await this.brandRepo.findOne(command.brand);

    if (!foundCategory || !foundSubCategory || !foundModel || !foundBrand)
      throw new NotFoundException(NotFoundExceptionMessage);

    let foundTags = new Array<string>();
    if (command.is_published && !command.is_draft) {
      for await (const tag of command.tags) {
        let foundTag = await this.tagRepo.findOne(tag);
        if (!foundTag) throw new NotFoundException(NotFoundExceptionMessage);
        let checkTagIsComplete = this.tagService.checkTagIsComplete(foundTag);
        if (checkTagIsComplete === false)
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

    let foundRelatedProducts = new Array<string>();
    for await (const tag of command.admin_preferred_related_products) {
      let foundRelatedProduct = await this.productRepo.findOne(tag);
      if (!foundRelatedProduct)
        throw new NotFoundException(NotFoundExceptionMessage);
      foundRelatedProducts.push(foundRelatedProduct.id);
    }

    if (command.color.base_color) {
      let foundColor = await this.colorRepository.findOne(
        command.color.base_color,
      );
      if (!foundColor) throw new NotFoundException(NotFoundExceptionMessage);
      command.color.base_color = foundColor.id;
    }

    let images = new Array<ProductImage>();
    if (command.images.length > 0) {
      for await (const image of command.images) {
        let foundImage = await this.fileService.getFileDetail(image.url);
        let foundThumbnail = await this.fileService.getFileDetail(
          image.thumbnail,
        );

        images.push({
          url: foundImage,
          thumbnail: foundThumbnail,
          is_primary: image.is_primary,
        });
      }
    }

    const uuid = new ShortUniqueId({ length: 6 });
    let custom_id: string = TenzuBarCode + uuid.randomUUID();

    let newProduct = new Product();
    newProduct.name = command.name;
    newProduct.seo_name = { fa: command.seo_name_fa, en: command.seo_name_en };
    newProduct.model_id = foundModel.id;
    newProduct.brand = foundBrand.id;
    newProduct.category = foundCategory.id;
    newProduct.subcategory = foundSubCategory.id;
    newProduct.tags = command.tags;
    newProduct.images = images;
    newProduct.custom_id = custom_id;
    newProduct.availability = command.availability;
    newProduct.color = command.color;
    newProduct.rating = { score: 0, stars: 0, total_ratings: 0 };
    newProduct.videos = command.videos;
    newProduct.features = command.features;
    newProduct.properties = command.properties;
    newProduct.admin_preferred_related_products = foundRelatedProducts;
    newProduct.is_draft = command.is_draft;
    newProduct.is_published = command.is_published;

    let createdProduct = await this.productRepo.createOne(newProduct);

    if (!command.product_group) {
      let newProductGroup = new ProductGroup();
      (newProductGroup.product_id = createdProduct.id),
        (newProductGroup.products = new Array<string>());
      this.productGroupRepo.createOne(newProductGroup);
    } else {
      let foundGroup = await this.productGroupRepo.findOne(
        command.product_group,
      );
      if (foundGroup) {
        foundGroup.products.push(createdProduct.id);
        this.productGroupRepo.updateOne(foundGroup.id, foundGroup);
        this.productRepo.updateOne(createdProduct.id, {
          product_group: foundGroup.id,
        });
      } else throw new NotFoundException(NotFoundExceptionMessage);
    }

    createdProduct.properties.forEach((propertiesItem) => {
      propertiesItem.items.forEach((property: PropertiesItemDualLanguage) => {
        let propertyIndexFa = new PropertyIndex();
        propertyIndexFa.product_id = createdProduct.id;
        propertyIndexFa.subcategory_id = foundSubCategory.id;
        propertyIndexFa.prop = property.fa.prop;
        propertyIndexFa.value = property.fa.value;
        this.propertyIndexRepo.createOne(propertyIndexFa);

        let propertyIndexEn = new PropertyIndex();
        propertyIndexEn.product_id = createdProduct.id;
        propertyIndexEn.subcategory_id = foundSubCategory.id;
        propertyIndexEn.prop = property.en.prop;
        propertyIndexEn.value = property.en.value;
        this.propertyIndexRepo.createOne(propertyIndexEn);
      });
    });
  }
}
