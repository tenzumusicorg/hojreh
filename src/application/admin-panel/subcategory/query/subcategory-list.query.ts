import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  SubCategoryItemDto,
  SubCategoryListDto,
} from '../dto/subcategory-list.dto';
import { ISubCategoryRepository } from 'src/domain/subcategory/interface/ISubCategory.repository';

export class SubCategoryListQuery {
  constructor(public category_id: string) {
    // public limit: number, // public page: number,
    // public query: string,
  }
}

@QueryHandler(SubCategoryListQuery)
export class SubCategoryListHandler
  implements IQueryHandler<SubCategoryListQuery>
{
  constructor(
    @Inject(ISubCategoryRepository)
    private readonly subCategoryRepository: ISubCategoryRepository,
  ) {}

  async execute(query: SubCategoryListQuery) {
    let foundSubCategories = await this.subCategoryRepository
      .model()
      .aggregate([
        {
          $match: {
            category_id: query.category_id,
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'category',
            as: 'products',
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            thumbnail: 1,
            productCount: { $size: '$products' },
          },
        },
      ]);

    let res = new SubCategoryListDto();
    res.items = new Array<SubCategoryItemDto>();

    for await (const category of foundSubCategories) {
      res.items.push({
        id: category.id,
        thumbnail: category.thumbnail.url,
        thumbnail_id: category.thumbnail.url,
        title: category.title,
        product_count: category.productCount,
      });
    }

    return res;
  }
}
