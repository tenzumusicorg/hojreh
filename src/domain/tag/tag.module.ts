import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema } from './schema/tag.schema';
import { ITagRepository } from './interface/ITag.repository';
import TagRepository from './repository/tag.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Tag',
        schema: TagSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: ITagRepository,
      useClass: TagRepository,
    },
  ],
  exports: [ITagRepository],
})
export default class TagDomainModule {}
