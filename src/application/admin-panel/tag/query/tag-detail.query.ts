import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import { TagDto } from '../dto/tag.dto';
import { ITagRepository } from 'src/domain/tag/interface/ITag.repository';

export class TagDetailQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(TagDetailQuery)
export class TagDetailHandler implements IQueryHandler<TagDetailQuery> {
  constructor(
    @Inject(ITagRepository)
    private readonly tagRepository: ITagRepository,
  ) {}

  async execute(query: TagDetailQuery): Promise<TagDto> {
    let foundTag = await this.tagRepository.findOne(query.id);
    if (!foundTag) throw new NotFoundException(NotFoundExceptionMessage);

    let res = new TagDto();
    res.id = foundTag.id;
    res.banner = foundTag.banner.url;
    res.banner_id = foundTag.banner.url;
    res.thumbnail = foundTag.thumbnail.url;
    res.thumbnail_id = foundTag.thumbnail.url;
    res.title = foundTag.title;
    res.descriptions = foundTag.descriptions;
    res.faq_title = foundTag.faq_title;
    res.seo_description = foundTag.seo_description;
    res.seo_title = foundTag.seo_title;
    res.faq_list = foundTag.faq_list;

    return res;
  }
}
