import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  PaginationParams,
  PaginationParamsResponse,
} from 'src/domain/database/pagination-params.interface';
import { IProductRepository } from 'src/domain/product/interface/IProduct.repository';
import {
  ProductSearchFilterDto,
  ProductSearchResDto,
  SearchProductColorDto,
  SearchProductItem,
  SearchSortEnum,
} from '../dto/product-list.dto';
import { PaginateOptions } from 'mongoose';
import ProductService from '../product.service';
import { IProductGroupRepository } from 'src/domain/product/interface/IProduct-group.repository';

export class ProductListQuery {
  constructor(
    public query: string,
    public pagination: PaginationParams,
    public sorting: string,
    public filter: ProductSearchFilterDto,
  ) {}
}

@CommandHandler(ProductListQuery)
export class ProductListHandler implements ICommandHandler<ProductListQuery> {
  constructor(
    @Inject(IProductRepository)
    private productRepo: IProductRepository,
    private productService: ProductService,
    @Inject(IProductGroupRepository)
    private productGroupRepo: IProductGroupRepository,
  ) {}

  async execute(query: ProductListQuery): Promise<ProductSearchResDto> {
    const sorting = {
      by: 'createdAt',
      type: -1,
    };
    if (query.sorting) {
      if (query.sorting == SearchSortEnum.CREATED_AT_ASC) {
        sorting.by = 'createdAt';
        sorting.type = 1;
      } else if (query.sorting == SearchSortEnum.CREATED_AT_DSC) {
        sorting.by = 'createdAt';
        sorting.type = -1;
      } else if (query.sorting == SearchSortEnum.PRICE_ASC) {
        sorting.by = 'price.price';
        sorting.type = 1;
      } else if (query.sorting == SearchSortEnum.PRICE_DSC) {
        sorting.by = 'price.price';
        sorting.type = -1;
      }
      if (query.sorting == SearchSortEnum.UPDATED_AT_ASC) {
        sorting.by = 'updatedAt';
        sorting.type = 1;
      } else if (query.sorting == SearchSortEnum.UPDATED_AT_DSC) {
        sorting.by = 'updatedAt';
        sorting.type = -1;
      }
    }
    const sortOptions = { [sorting.by as string]: sorting.type as Number };

    const sortObj = { 'availability.is_available': -1, ...sortOptions };
    const options: PaginateOptions = {
      select: [
        '_id',
        'id',
        'name',
        'seo_name',
        'category',
        'subcategory',
        'tags',
        'brand',
        'images',
        'model_id',
        'price',
        'availability',
        'color',
        'createdAt',
        'updatedAt',
        'is_published',
        'is_draft',
        'last_update',
      ],
      populate: [
        {
          path: 'brand',
          model: 'Brand',
        },
        {
          path: 'category',
          model: 'Category',
        },
        {
          path: 'subcategory',
          model: 'SubCategory',
        },
        {
          path: 'model_id',
          model: 'Model',
          populate: { path: 'brand', model: 'Brand' },
        },
        {
          path: 'color.base_color',
          model: 'Color',
        },
      ],
      sort: sortObj,
      page: query.pagination.page,
      limit: query.pagination.limit,
    };

    let productQuery = this.productRepo.model().find();
    productQuery.where({
      product_group: null,
    });

    if (!!query.query) {
      productQuery.where({
        $or: [
          { name: new RegExp(query.query, 'i') },
          { 'seo_name.fa': new RegExp(query.query, 'i') },
          { 'seo_name.en': new RegExp(query.query, 'i') },
        ],
      });
    }
    if (!!query.filter) {
      if (!!query.filter.name) {
        productQuery.where({
          $or: [
            { name: new RegExp(query.query, 'i') },
            { 'seo_name.fa': new RegExp(query.query, 'i') },
            { 'seo_name.en': new RegExp(query.query, 'i') },
          ],
        });
      }
      if (!!query.filter.brand) {
        productQuery.where({
          brand: query.filter.brand,
        });
      }
      if (!!query.filter.model) {
        productQuery.where({
          model_id: query.filter.model,
        });
      }
      if (!!query.filter.category) {
        productQuery.where({
          category: query.filter.category,
        });
      }
      if (!!query.filter.subcategory) {
        productQuery.where({
          subcategory: query.filter.subcategory,
        });
      }
      if (!!query.filter.tags) {
        productQuery.where({
          tags: query.filter.tags,
        });
      }

      if (!!query.filter.date) {
        productQuery.where({
          $and: [
            { createdAt: { $gte: new Date(query.filter.date.from) } },
            { createdAt: { $lte: new Date(query.filter.date.to) } },
          ],
        });
      }

      if (!!query.filter.price) {
        productQuery.where({
          $and: [
            { 'price.price': { $gte: Number(query.filter.price.from) } },
            { 'price.price': { $lte: Number(query.filter.price.to) } },
          ],
        });
      }
    }

    let foundProductList = await this.productRepo
      .model()
      .paginate(query, options);

    let res = new ProductSearchResDto();
    res.items = new Array<SearchProductItem>();
    for await (const resultItem of foundProductList.docs) {
      let item = resultItem as any;
      let product = new SearchProductItem();
      product.id = item.id;
      product.name = item.name;
      product.seo_name = item.seo_name;
      product.category = {
        id: item.category.id,
        title: item.category.title,
      };
      product.subcategory = {
        id: item.subcategory.id,
        title: item.subcategory.title,
      };
      product.brand = {
        id: item.brand.id,
        logo: item.brand.logo?.url,
        name: item.brand.name,
      };
      product.model = {
        id: item.model_id.id,
        name: item.model_id.name,
      };
      product.created_at = item.createdAt;
      product.updated_at = item.updatedAt;
      product.last_update = item.last_update ? item.last_update : null;

      let activeImage = this.productService.getProductPrimaryImage(item);
      product.image = activeImage.thumbnail?.url;
      product.image_id = activeImage.thumbnail?.id;
      product.colors = new Array<SearchProductColorDto>();
      let foundGroup = (await this.findGroupByOwnerProduct(item.id)) as any;

      if (!!foundGroup) {
        product.product_group = foundGroup?.id;
        product.colors.push({
          color: {
            base_color: {
              id: foundGroup.product_id.color.base_color?.id,
              link: foundGroup.product_id.color.base_color?.link.url,
              color_fa: foundGroup.product_id.color.base_color?.color_fa,
              color_en: foundGroup.product_id.color.base_color?.color_en,
            },
            has_color: foundGroup.product_id.color.has_color,
            product_color_name_fa:
              foundGroup.product_id.color.product_color_name_fa,
            product_color_name_en:
              foundGroup.product_id.color.product_color_name_en,
          },
          product_id: foundGroup.product_id._id,
        });

        foundGroup?.products.forEach((productGroupItem) => {
          product.colors.push({
            color: {
              base_color: {
                id: productGroupItem.color.base_color?.id,
                link: productGroupItem.color.base_color?.link.url,
                color_fa: productGroupItem.color.base_color?.color_fa,
                color_en: productGroupItem.color.base_color?.color_en,
              },
              has_color: productGroupItem.color.has_color,
              product_color_name_fa:
                productGroupItem.color.product_color_name_fa,
              product_color_name_en:
                productGroupItem.color.product_color_name_en,
            },
            product_id: productGroupItem.id,
          });
        });
      }
      product.price = this.productService.calculateProductPrice(
        resultItem.price,
      );
      product.is_draft = resultItem.is_draft;
      product.is_published = resultItem.is_published;
      product.call_to_buy = resultItem.price.call_to_buy;
      product.is_used = resultItem.price.is_used;
      product.total_count = resultItem.availability.total_count;
      product.is_available = resultItem.availability.is_available;
      res.items.push(product);
    }
    res.pagination = new PaginationParamsResponse();
    res.pagination.current_page = foundProductList.page
      ? foundProductList.page
      : query.pagination.page;
    res.pagination.limit = foundProductList.limit
      ? foundProductList.limit
      : query.pagination.limit;
    res.pagination.total_items = foundProductList.totalDocs;
    res.pagination.total_pages = foundProductList.totalPages;

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
}
