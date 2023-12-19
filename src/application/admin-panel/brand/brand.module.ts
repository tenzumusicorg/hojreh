import { Module, OnModuleInit } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import BrandDomainModule from 'src/domain/brand/brand.module';
import { BrandController } from './brand.controller';

export const commandHandlers = [];
export const queryHandlers = [];

@Module({
  imports: [CqrsModule, BrandDomainModule],
  controllers: [BrandController],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export default class BrandModule implements OnModuleInit {
  constructor() {}
  async onModuleInit() {}
}
