import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import BrandDomainModule from 'src/domain/brand/brand.module';
import { BrandController } from './brand.controller';
import FileDomainModule from 'src/domain/file/file.module';
import { CreateBrandHandler } from './command/create-brand.command';
import { DeleteBrandHandler } from './command/delete-brand.command';
import { UpdateBrandHandler } from './command/update-brand.command';

export const commandHandlers = [
  CreateBrandHandler,
  DeleteBrandHandler,
  UpdateBrandHandler,
];
export const queryHandlers = [];

@Module({
  imports: [CqrsModule, BrandDomainModule, FileDomainModule],
  controllers: [BrandController],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export default class BrandModule implements OnModuleInit {
  constructor() {}
  async onModuleInit() {}
}
