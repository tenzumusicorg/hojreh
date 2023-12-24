import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IColorRepository } from './interface/IColor.repository';
import ColorRepository from './repository/color.repository';
import { ColorSchema } from './schema/color.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Color',
        schema: ColorSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: IColorRepository,
      useClass: ColorRepository,
    },
    ColorRepository,
  ],
  exports: [IColorRepository, ColorRepository],
})
export default class ColorDomainModule {}
