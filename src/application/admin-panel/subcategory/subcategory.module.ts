import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import FileDomainModule from 'src/domain/file/file.module';
import { FaqDomainModule } from 'src/domain/faq/faq.module';
import CategoryDomainModule from 'src/domain/category/category.module';
import { CreateSubCategoryHandler } from './command/create-subcategory.command';
import { UpdateSubCategoryHandler } from './command/update-subcategory.command';
import { DeleteSubCategoryFaqHandler } from './command/delete-subcategory-faq.command';
import { MoveUpSubCategoryFaqHandler } from './command/moveup-subcategory-faq.command';
import { MoveDownSubCategoryFaqHandler } from './command/movedown-subcategory-faq.command';
import { UpdateSubCategoryFaqHandler } from './command/update-subcategory-faq.command';
import { DeleteSubCategoryHandler } from './command/delete-subcategory.command';
import { AddSubCategoryFaqHandler } from './command/add-subcategory-faq.command';
import { SubCategoryDetailQuery } from './query/subcategory-detail.query';
import { SubCategoryListHandler } from './query/subcategory-list.query';
import { SubCategoryController } from './subcategory.controller';
import SubCategoryDomainModule from 'src/domain/subcategory/subcategory.module';

export const commandHandlers = [
  CreateSubCategoryHandler,
  UpdateSubCategoryHandler,
  DeleteSubCategoryFaqHandler,
  MoveUpSubCategoryFaqHandler,
  MoveDownSubCategoryFaqHandler,
  UpdateSubCategoryFaqHandler,
  DeleteSubCategoryHandler,
  AddSubCategoryFaqHandler,
];
export const queryHandlers = [SubCategoryDetailQuery, SubCategoryListHandler];

@Module({
  imports: [
    CqrsModule,
    CategoryDomainModule,
    SubCategoryDomainModule,
    FileDomainModule,
    FaqDomainModule,
  ],
  controllers: [SubCategoryController],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export default class SubCategoryModule {}
