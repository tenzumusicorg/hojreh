import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import { ITagRepository } from 'src/domain/tag/interface/ITag.repository';
import { TagStatusItemDto, TagsStatusDto } from '../dto/tag-status.dto';
import { Tag } from 'src/domain/tag/entity/tag.entity';

export class TagStatusQuery {
  constructor(public readonly tags: Array<string>) {}
}

@QueryHandler(TagStatusQuery)
export class TagStatusHandler implements IQueryHandler<TagStatusQuery> {
  constructor(
    @Inject(ITagRepository)
    private readonly tagRepository: ITagRepository,
  ) {}

  async execute(query: TagStatusQuery): Promise<TagsStatusDto> {
    let items = new Array<TagStatusItemDto>();
    for await (const tag of query.tags) {
      let foundTag = await this.tagRepository.findOne(tag);
      if (!foundTag) throw new NotFoundException(NotFoundExceptionMessage);

      items.push({
        is_completed: this.checkTagIsComplete(foundTag),
        tag_id: foundTag.id,
      });
    }

    return { tags: items };
  }

  checkTagIsComplete(tag: Tag): boolean {
    if (!tag.thumbnail || !tag.title.en) {
      return false;
    }
    return true;
  }
}
