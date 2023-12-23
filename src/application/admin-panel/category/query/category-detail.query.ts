import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import { CategoryDto } from '../dto/category.dto';
import { ICategoryRepository } from 'src/domain/category/interface/ICategory.repository';

export class CategoryDetailQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(CategoryDetailQuery)
export class CategoryDetailHandler
  implements IQueryHandler<CategoryDetailQuery>
{
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(query: CategoryDetailQuery): Promise<CategoryDto> {
    let foundCategory = await this.categoryRepository.findOne(query.id);
    if (!foundCategory) throw new NotFoundException(NotFoundExceptionMessage);

    let res = new CategoryDto();
    res.id = foundCategory.id;
    res.banner = foundCategory.banner.url;
    res.banner_id = foundCategory.banner.url;
    res.thumbnail = foundCategory.thumbnail.url;
    res.thumbnail_id = foundCategory.thumbnail.url;
    res.title = foundCategory.title;
    res.descriptions = foundCategory.descriptions;
    res.faq_title = foundCategory.faq_title;
    res.seo_description = foundCategory.seo_description;
    res.seo_title = foundCategory.seo_title;
    res.faq_list = foundCategory.faq_list;
    return res;
  }
}
