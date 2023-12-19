import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandSchema } from './schema/brand.schema';
import { IBrandRepository } from './interface/IBrand.repository';
import BrandRepository from './repository/brand.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Brand',
        schema: BrandSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: IBrandRepository,
      useClass: BrandRepository,
    },
  ],
  exports: [IBrandRepository],
})
export default class BrandDomainModule {}
