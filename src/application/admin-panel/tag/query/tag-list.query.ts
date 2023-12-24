import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TagItemDto, TagListDto } from '../dto/tag-list.dto';
import { ITagRepository } from 'src/domain/tag/interface/ITag.repository';
import { PaginationParams } from 'src/domain/database/pagination-params.interface';

export class TagListQuery {
  constructor(
    public pagination: PaginationParams,
    public filter: {
      query: string;
      category_id: string;
      subcategory_id: string;
    },
  ) {}
}

@QueryHandler(TagListQuery)
export class TagListHandler implements IQueryHandler<TagListQuery> {
  constructor(
    @Inject(ITagRepository)
    private readonly tagRepository: ITagRepository,
  ) {}

  async execute(query: TagListQuery) {
    const aggregationPipeline = [];

    if (query.filter && query.filter.query) {
      aggregationPipeline.push({
        $match: {
          $or: [
            { 'title.fa': new RegExp(query.filter.query, 'i') },
            { 'title.en': new RegExp(query.filter.query, 'i') },
          ],
        },
      });
    }
    aggregationPipeline.push({
      $lookup: {
        from: 'subcategories',
        localField: 'sub_category_id',
        foreignField: '_id',
        as: 'sub_category',
      },
    });

    aggregationPipeline.push({
      $lookup: {
        from: 'categories',
        localField: 'sub_category.category_id',
        foreignField: '_id',
        as: 'category',
      },
    });

    if (query.filter && query.filter.category_id) {
      aggregationPipeline.push({
        $match: {
          'category._id': query.filter.category_id,
        },
      });
    }
    if (query.filter && query.filter.subcategory_id) {
      aggregationPipeline.push({
        $match: {
          'sub_category._id': query.filter.subcategory_id,
        },
      });
    }

    const { page, limit } = query.pagination;
    const skip = (page - 1) * limit;

    aggregationPipeline.push({
      $skip: skip,
    });

    aggregationPipeline.push({
      $limit: limit,
    });

    let foundTags = await this.tagRepository
      .model()
      .aggregate(aggregationPipeline);
    let res = new TagListDto();
    res.items = new Array<TagItemDto>();

    for (const tag of foundTags) {
      res.items.push({
        id: tag._id,
        title: tag.title,
        thumbnail: !!tag.thumbnail ? tag.thumbnail.url : '',
        thumbnail_id: !!tag.thumbnail ? tag.thumbnail._id : '',
        banner: !!tag.banner ? tag.banner.url : '',
        banner_id: !!tag.banner ? tag.banner._id : '',
        subcategory: {
          id: tag.sub_category_id._id,
          title: tag.sub_category_id.title,
          category: {
            id: tag.sub_category_id.category_id._id,
            title: tag.sub_category_id.category_id.title,
          },
        },
      });

      return res;
    }
  }
}
