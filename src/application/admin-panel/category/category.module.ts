import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import FileDomainModule from 'src/domain/file/file.module';
import { FaqDomainModule } from 'src/domain/faq/faq.module';
import CategoryDomainModule from 'src/domain/category/category.module';
import { CreateCategoryHandler } from './command/create-category.command';
import { UpdateCategoryHandler } from './command/update-category.command';
import { AddCategoryFaqHandler } from './command/add-category-faq.command';
import { DeleteCategoryFaqHandler } from './command/delete-category-faq.command';
import { MoveUpCategoryFaqHandler } from './command/movedown-category-faq.command';
import { MoveDownCategoryFaqHandler } from './command/moveup-category.faq.command';
import { UpdateCategoryFaqHandler } from './command/update-category-faq.command';
import { DeleteCategoryHandler } from './command/delete-category.command';
import { CategoryDetailQuery } from './query/category-detail.query';
import { CategoryListQuery } from './query/category-list.query';
import { CategoryController } from './category.controller';

export const commandHandlers = [
  CreateCategoryHandler,
  UpdateCategoryHandler,
  AddCategoryFaqHandler,
  DeleteCategoryFaqHandler,
  MoveUpCategoryFaqHandler,
  UpdateCategoryFaqHandler,
  MoveDownCategoryFaqHandler,
  DeleteCategoryHandler,
];
export const queryHandlers = [CategoryDetailQuery, CategoryListQuery];

@Module({
  imports: [
    CqrsModule,
    CategoryDomainModule,
    FileDomainModule,
    FaqDomainModule,
  ],
  controllers: [CategoryController],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export default class CategoryModule implements OnModuleInit {
  constructor() {}
  async onModuleInit() {}
}
