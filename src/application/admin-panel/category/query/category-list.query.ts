import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ICategoryRepository } from 'src/domain/category/interface/ICategory.repository';
import { CategoryItemDto, CategoryListDto } from '../dto/category-list.dto';

export class CategoryListQuery {
  constructor() // public limit: number, // public page: number,
  // public query: string,
  {}
}

@QueryHandler(CategoryListQuery)
export class CategoryListHandler implements IQueryHandler<CategoryListQuery> {
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute() {
    let foundCategories = await this.categoryRepository.model().aggregate([
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

    let res = new CategoryListDto();
    res.items = new Array<CategoryItemDto>();

    for await (const category of foundCategories) {
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
