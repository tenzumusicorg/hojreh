import { Module } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import ColorDomainModule from 'src/domain/color/color.module';
import { ColorDetailHandler } from './query/color-detail.query';
import { CreateColorHandler } from './command/create-color.command';
import { UpdateColorHandler } from './command/update-color.command';
import { DeleteColorHandler } from './command/delete-color.command';

export const commandHandlers = [
  CreateColorHandler,
  UpdateColorHandler,
  DeleteColorHandler,
];
export const queryHandlers = [ColorDetailHandler];

@Module({
  imports: [CqrsModule, ColorDomainModule],
  controllers: [],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export default class ColorModule {}
