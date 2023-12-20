import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import { IModelRepository } from 'src/domain/Model/interface/IModel.repository';
import { ModelDto } from '../dto/model-detail.dto';
import { Brand } from 'src/domain/brand/entity/brand.entity';

export class ModelDetailQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(ModelDetailQuery)
export class ModelDetailHandler implements IQueryHandler<ModelDetailQuery> {
  constructor(
    @Inject(IModelRepository)
    private readonly modelRepository: IModelRepository,
  ) {}

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
