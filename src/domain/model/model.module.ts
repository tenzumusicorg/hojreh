import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelSchema } from './schema/model.schema';
import { IModelRepository } from './interface/IModel.repository';
import ModelRepository from './repository/model.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Model',
        schema: ModelSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    ModelRepository,
    {
      provide: IModelRepository,
      useClass: ModelRepository,
    },
  ],
  exports: [IModelRepository, ModelRepository],
})
export default class ModelDomainModule {}
