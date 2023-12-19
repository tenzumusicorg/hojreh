import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import { IBrandRepository } from 'src/domain/brand/interface/IBrand.repository';
import { GetBrandDetailResDto } from '../dto/get-brand-detail.dto';

export class BrandDetailQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(BrandDetailQuery)
export class BrandDetailHandler implements IQueryHandler<BrandDetailQuery> {
  constructor(
    @Inject(IBrandRepository)
    private readonly brandRepository: IBrandRepository,
  ) {}

  async execute(query: BrandDetailQuery): Promise<GetBrandDetailResDto> {
    let foundBrand = await this.brandRepository.findOne(query.id);
    if (!foundBrand) throw new NotFoundException(NotFoundExceptionMessage);

    let res = new GetBrandDetailResDto();
    res.id = foundBrand.id;
    res.logo = foundBrand.logo.url;
    res.name = foundBrand.name;
    res.descriptions = foundBrand.descriptions;
    res.faq_list = foundBrand.faq_list;
    return res;
  }
}
