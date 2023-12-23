import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schema/category.schema';
import { ICategoryRepository } from './interface/ICategory.repository';
import CategoryRepository from './repository/category.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: ICategoryRepository,
      useClass: CategoryRepository,
    },
    CategoryRepository,
  ],
  exports: [ICategoryRepository, CategoryRepository],
})
export default class CategoryDomainModule {}
