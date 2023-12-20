import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginateOptions } from 'mongoose';
import { IBrandRepository } from 'src/domain/brand/interface/IBrand.repository';
import { BrandItemDto, GetBrandListResDto } from '../dto/get-brand-list.dto';

export class BrandListQuery {
  constructor(
    public page: number,
    public limit: number,
    public query: string,
  ) {}
}

@QueryHandler(BrandListQuery)
export class BrandListHandler implements IQueryHandler<BrandListQuery> {
  constructor(
    @Inject(IBrandRepository)
    private readonly brandRepository: IBrandRepository,
  ) {}

  async execute(query: BrandListQuery) {
    const options: PaginateOptions = {
      select: ['_id', 'name', 'description', 'logo', 'faq_list'],
      populate: [],
      page: query.page,
      limit: query.limit,
    };

    let brandQuery = this.brandRepository.model().find();

    if (!!query.query) {
      brandQuery.where({
        $or: [
          { 'name.fa': new RegExp(query.query, 'i') },
          { 'name.en': new RegExp(query.query, 'i') },
        ],
      });
    }

    let foundBrands = await this.brandRepository
      .model()
      .paginate(brandQuery, options);
    let res = new GetBrandListResDto();
    res.items = new Array<BrandItemDto>();

    for await (const brand of foundBrands.docs) {
      res.items.push({
        id: brand.id,
        name: brand.name,
        logo: brand.logo.url,
      });
    }

    return res;
  }
}
