import { Module } from '@nestjs/common';
import ModelDomainModule from 'src/domain/model/model.module';
import { CreateModelHandler } from './command/create-model.command';
import { UpdateModelHandler } from './command/update-model.command';
import { ModelListHandler } from './query/model-list.query';
import { ModelDetailHandler } from './query/model-detail.query';
import { DeleteModelHandler } from './command/delete-model.command';
import { CqrsModule } from '@nestjs/cqrs';

export const commandHandlers = [
  CreateModelHandler,
  UpdateModelHandler,
  DeleteModelHandler,
];
export const queryHandlers = [ModelListHandler, ModelDetailHandler];

@Module({
  imports: [CqrsModule, ModelDomainModule],
  controllers: [],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export default class ModelModule {}
