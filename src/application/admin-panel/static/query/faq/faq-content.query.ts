import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import StaticsRepository from 'src/domain/static/repository/statics.repository';

export class FaqContentQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(FaqContentQuery)
export class BannerDetailHandler implements IQueryHandler<FaqContentQuery> {
  constructor(private readonly staticRepository: StaticsRepository) {}

  async execute(query: FaqContentQuery) {

  }
}
