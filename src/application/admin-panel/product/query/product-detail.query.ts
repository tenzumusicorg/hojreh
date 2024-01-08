import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IProductRepository } from 'src/domain/product/interface/IProduct.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import { escapeRegExp } from 'lodash';
import { ProductDto } from '../dto/product.dto';
import { Tag } from 'src/domain/tag/entity/tag.entity';
import { ProductImageResponseDto } from '../dto/product-image.dto';
import ProductService from '../product.service';
import { IProductGroupRepository } from 'src/domain/product/interface/IProduct-group.repository';
import { ProductGroupItemDto } from '../dto/product-group.dto';

export class ProductDetailQuery {
  constructor(
    public slug: string,
    public id: string,
  ) {}
}

@CommandHandler(ProductDetailQuery)
export class ProductDetailHandler
  implements ICommandHandler<ProductDetailQuery>
{
  constructor(
    @Inject(IProductRepository)
    private productRepo: IProductRepository,
    private productService: ProductService,
    @Inject(IProductGroupRepository)
    private productGroupRepo: IProductGroupRepository,
  ) {}

  async execute(query: ProductDetailQuery): Promise<ProductDto> {
    let productQuery = {};

    if (!!query.slug) {
      let searchValue = escapeRegExp(query.slug);
      const regexName = new RegExp(searchValue, 'i');
      productQuery = {
        name: {
          $regex: regexName,
        },
      };
    } else {
      productQuery = {
        _id: query.id,
      };
    }
    let foundProduct = (await this.productRepo
      .model()
      .findOne({
        productQuery,
      })
      .populate({
        path: 'category',
        model: 'Category',
      })
      .populate({
        path: 'subcategory',
        model: 'SubCategory',
      })
      .populate({
        path: 'tags',
        model: 'Tag',
      })
      .populate({
        path: 'brand',
        model: 'Brand',
      })
      .populate({
        path: 'model_id',
        model: 'Model',
        populate: { path: 'brand', model: 'Brand' },
      })
      .populate('admin_preferred_related_products')
      .populate({
        path: 'color.base_color',
        model: 'Color',
      })) as any;

    if (!foundProduct) throw new NotFoundException(NotFoundExceptionMessage);

    let res = new ProductDto();
    res.id = foundProduct.id;
    res.name = foundProduct.name;
    res.seo_name = foundProduct.seo_name;
    res.category.id = foundProduct.category.id;
    res.category.title = foundProduct.category.title;
    res.subcategory.id = foundProduct.subcategory.id;
    res.subcategory.title = foundProduct.subcategory.title;
    res.tags = foundProduct.tags.map((element: Tag) => {
      return { id: element.id, title: element.title };
    });
    res.brand = {
      id: foundProduct.brand.id,
      logo: foundProduct.brand.logo.url,
      name: foundProduct.brand.name,
    };
    res.model = {
      id: foundProduct.model_id._id,
      name: foundProduct.model_id.name,
    };
    res.rating = foundProduct.rating;
    res.images = new Array<ProductImageResponseDto>();
    for await (const productImage of foundProduct.images) {
      res.images.push({
        url: productImage.url.url,
        is_primary: productImage.is_primary,
        thumbnail: productImage.thumbnail.url,
        thumbnail_id: productImage.thumbnail.id,
        url_id: productImage.url.id,
      });
    }
    res.price = {
      ...foundProduct.price,
      price_to_pay: this.productService.calculateProductPrice(
        foundProduct.price,
      ),
    };
    res.custom_id = foundProduct.custom_id;
    res.availability = foundProduct.availability;
    let foundGroup;
    if (!foundProduct.product_group) {
      foundGroup = await this.findGroupByOwnerProduct(foundProduct.id);
    } else {
      foundGroup = await this.findGroup(foundProduct.product_group);
    }
    if (!!foundGroup) {
      let productGroup = new Array<ProductGroupItemDto>();
      for await (const element of foundGroup.products) {
        let image = this.productService.getProductPrimaryImage(element);
        productGroup.push({
          id: element.id,
          name: element.name,
          seo_name: element.seo_name,
          thumbnail: image.thumbnail.url,
          brand: {
            id: element.brand.id,
            logo: element.brand.logo?.url,
            name: element.brand.name,
          },
          category: {
            id: element.category.id,
            title: element.category.title,
          },
          model: {
            id: element.model_id.id,
            name: element.model_id.name,
          },
          subcategory: {
            id: element.subcategory.id,
            title: element.subcategory.title,
          },
        });
      }
      res.product_group = productGroup;
    }
    res.color = {
      has_color: foundProduct.color.has_color,
      product_color_name_fa: foundProduct.color.product_color_name_fa,
      product_color_name_en: foundProduct.color.product_color_name_en,
      base_color: {
        color_fa: foundProduct.color.base_color?.color_fa,
        color_en: foundProduct.color.base_color?.color_en,
        id: foundProduct.color.base_color?.id,
        link: foundProduct.color.base_color.link?.url,
      },
    };
    res.videos = foundProduct.videos;
    res.features = foundProduct.features;
    res.description = foundProduct.description;
    res.properties = foundProduct.properties;
    res.admin_preferred_related_products =
      foundProduct.admin_preferred_related_products;
    res.last_update = foundProduct.last_update
      ? foundProduct.last_update
      : null;

    res.created_at = foundProduct.createdAt;
    res.updated_at = foundProduct.updatedAt;

    return res;
  }

  private async findGroupByOwnerProduct(product_id: string) {
    return await this.productGroupRepo
      .model()
      .findOne({
        product_id,
      })
      .populate({
        path: 'product_id',
        populate: [
          { path: 'category', model: 'Category' },
          { path: 'subcategory', model: 'SubCategory' },
          { path: 'tags', model: 'Tag' },
          {
            path: 'brand',
            model: 'Brand',
          },
          { path: 'model_id', model: 'Model' },
          {
            path: 'color.base_color',
            model: 'Color',
          },
        ],
        model: 'Product',
      })
      .populate({
        path: 'products',
        populate: [
          { path: 'category', model: 'Category' },
          { path: 'subcategory', model: 'SubCategory' },
          { path: 'tags', model: 'Tag' },
          {
            path: 'brand',
            model: 'Brand',
          },
          { path: 'model_id', model: 'Model' },
          {
            path: 'color.base_color',
            model: 'Color',
          },
        ],
        model: 'Product',
      });
  }

  private async findGroup(groupId: string) {
    return await this.productGroupRepo
      .model()
      .findOne({
        _id: groupId,
      })
      .populate({
        path: 'product_id',
        populate: [
          { path: 'category', model: 'Category' },
          { path: 'subcategory', model: 'SubCategory' },
          { path: 'tags', model: 'Tag' },
          {
            path: 'brand',
            model: 'Brand',
          },
          { path: 'model_id', model: 'Model' },
          {
            path: 'color.base_color',
            model: 'Color',
          },
        ],
        model: 'Product',
      })
      .populate({
        path: 'products',
        populate: [
          { path: 'category', model: 'Category' },
          { path: 'subcategory', model: 'SubCategory' },
          { path: 'tags', model: 'Tag' },
          {
            path: 'brand',
            model: 'Brand',
          },
          { path: 'model_id', model: 'Model' },
          {
            path: 'color.base_color',
            model: 'Color',
          },
        ],
        model: 'Product',
      });
  }
}
