import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ISubCategoryRepository } from './interface/ISubCategory.repository';
import SubCategoryRepository from './repository/subcategory.repository';
import { SubCategorySchema } from './schema/subcategory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'SubCategory',
        schema: SubCategorySchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: ISubCategoryRepository,
      useClass: SubCategoryRepository,
    },
  ],
  exports: [ISubCategoryRepository],
})
export default class SubCategoryDomainModule {}
