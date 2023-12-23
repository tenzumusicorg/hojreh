import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TagItemDto, TagListDto } from '../dto/tag-list.dto';
import { ITagRepository } from 'src/domain/tag/interface/ITag.repository';

export class TagListQuery {
  constructor(public sub_category_id: string) {
    // public limit: number, // public page: number,
    // public query: string,
  }
}

@QueryHandler(TagListQuery)
export class TagListHandler implements IQueryHandler<TagListQuery> {
  constructor(
    @Inject(ITagRepository)
    private readonly tagRepository: ITagRepository,
  ) {}

  async execute(query: TagListQuery) {
    let foundTags = await this.tagRepository.model().aggregate([
      {
        $match: {
          subcategory_id: query.sub_category_id,
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'tags',
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

    let res = new TagListDto();
    res.items = new Array<TagItemDto>();

    for await (const category of foundTags) {
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
