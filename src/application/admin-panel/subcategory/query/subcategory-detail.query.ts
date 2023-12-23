import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import { SubCategoryDto } from '../dto/subcategory.dto';
import { ISubCategoryRepository } from 'src/domain/subcategory/interface/ISubCategory.repository';

export class SubCategoryDetailQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(SubCategoryDetailQuery)
export class SubCategoryDetailHandler
  implements IQueryHandler<SubCategoryDetailQuery>
{
  constructor(
    @Inject(ISubCategoryRepository)
    private readonly subCategoryRepository: ISubCategoryRepository,
  ) {}

  async execute(query: SubCategoryDetailQuery): Promise<SubCategoryDto> {
    let foundSubCategory = await this.subCategoryRepository.findOne(query.id);
    if (!foundSubCategory)
      throw new NotFoundException(NotFoundExceptionMessage);

    let res = new SubCategoryDto();
    res.id = foundSubCategory.id;
    res.banner = foundSubCategory.banner.url;
    res.banner_id = foundSubCategory.banner.url;
    res.thumbnail = foundSubCategory.thumbnail.url;
    res.thumbnail_id = foundSubCategory.thumbnail.url;
    res.title = foundSubCategory.title;
    res.descriptions = foundSubCategory.descriptions;
    res.faq_title = foundSubCategory.faq_title;
    res.seo_description = foundSubCategory.seo_description;
    res.seo_title = foundSubCategory.seo_title;
    res.faq_list = foundSubCategory.faq_list;

    return res;
  }
}
