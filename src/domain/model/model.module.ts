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
    {
      provide: IModelRepository,
      useClass: ModelRepository,
    },
  ],
  exports: [],
})
export default class ModelDomainModule {}
