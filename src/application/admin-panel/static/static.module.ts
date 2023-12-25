import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import StaticsDomainModule from 'src/domain/static/static.module';

export const commandHandlers = [];
export const queryHandlers = [];

@Module({
  imports: [CqrsModule, StaticsDomainModule],
  controllers: [],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export default class StaticModule {}
