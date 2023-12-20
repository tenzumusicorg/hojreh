import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import { ModelDto } from '../dto/model-detail.dto';
import { Brand } from 'src/domain/brand/entity/brand.entity';
import ModelRepository from 'src/domain/model/repository/model.repository';

export class ModelDetailQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(ModelDetailQuery)
export class ModelDetailHandler implements IQueryHandler<ModelDetailQuery> {
  constructor(private readonly modelRepository: ModelRepository) {}

  async execute(query: ModelDetailQuery): Promise<ModelDto> {
    let foundModel = await this.modelRepository
      .model()
      .findOne({ _id: query.id });
    if (!foundModel) throw new NotFoundException(NotFoundExceptionMessage);

    let res = new ModelDto();

    res.id = foundModel.id;
    res.name = foundModel.name;
    let brand = foundModel.brand as unknown as Brand;
    res.brand = {
      id: foundModel.brand,
      logo: brand.logo.url,
      logo_id: brand.logo.url,
      name: brand.name,
    };

    return res;
  }
}
