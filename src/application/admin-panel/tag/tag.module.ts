import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import FileDomainModule from 'src/domain/file/file.module';
import { FaqDomainModule } from 'src/domain/faq/faq.module';

import SubCategoryDomainModule from 'src/domain/subcategory/subcategory.module';
import { TagController } from './tag.controller';
import TagDomainModule from 'src/domain/tag/tag.module';
import { TagListHandler } from './query/tag-list.query';
import { TagDetailHandler } from './query/tag-detail.query';
import { AddTagFaqHandler } from './command/add-tag-faq.command';
import { CreateTagHandler } from './command/create-tag.command';
import { UpdateTagHandler } from './command/update-tag.command';
import { DeleteTagHandler } from './command/delete-tag.command';
import { MoveUpTagFaqHandler } from './command/moveup-tag-faq-command';
import { MoveDownTagFaqHandler } from './command/movedown-tag.faq.command';
import { DeleteTagFaqHandler } from './command/delete-tag-faq.command';
import { UpdateTagFaqHandler } from './command/update-tag-faq.command';

export const commandHandlers = [
  AddTagFaqHandler,
  CreateTagHandler,
  UpdateTagHandler,
  DeleteTagHandler,
  MoveUpTagFaqHandler,
  MoveDownTagFaqHandler,
  DeleteTagFaqHandler,
  UpdateTagFaqHandler,
];
export const queryHandlers = [TagListHandler, TagDetailHandler];

@Module({
  imports: [
    CqrsModule,
    SubCategoryDomainModule,
    FileDomainModule,
    FaqDomainModule,
    TagDomainModule,
  ],
  controllers: [TagController],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export default class TagModule {}
