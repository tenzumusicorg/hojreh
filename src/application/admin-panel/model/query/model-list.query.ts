import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginateOptions } from 'mongoose';
import { IModelRepository } from 'src/domain/Model/interface/IModel.repository';
import { ModelItemDto, ModelListDto } from '../dto/model-list.dto';

export class ModelListQuery {
  constructor(
    public brand_id: string,
    public query: string,
  ) {}
}

@QueryHandler(ModelListQuery)
export class ModelListHandler implements IQueryHandler<ModelListQuery> {
  constructor(
    @Inject(IModelRepository)
    private readonly modelRepository: IModelRepository,
  ) {}

  async execute(query: ModelListQuery) {
    const options: PaginateOptions = {
      select: ['id', 'name'],
    };

    let modelQuery = this.modelRepository.model().find();

    modelQuery.where({ brand: query.brand_id });

    if (!!query.query) modelQuery.where({ name: new RegExp(query.query, 'i') });

    let foundModels = await this.modelRepository
      .model()
      .paginate(modelQuery, options);
    let res = new ModelListDto();
    res.items = new Array<ModelItemDto>();

    for await (const model of foundModels.docs) {
      res.items.push({
        id: model.id,
        name: model.name,
      });
    }

    return res;
  }
}
