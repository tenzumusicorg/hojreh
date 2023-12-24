import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import { ColorDto } from '../dto/color.dto';
import ColorRepository from 'src/domain/color/repository/color.repository';

export class ColorDetailQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(ColorDetailQuery)
export class ColorDetailHandler implements IQueryHandler<ColorDetailQuery> {
  constructor(private readonly colorRepository: ColorRepository) {}

  async execute(query: ColorDetailQuery): Promise<ColorDto> {
    let foundColor = await this.colorRepository
      .model()
      .findOne({ _id: query.id });
    if (!foundColor) throw new NotFoundException(NotFoundExceptionMessage);

    let res = new ColorDto();

    res.id = foundColor.id;
    res.color_en = foundColor.color_en;
    res.color_fa = foundColor.color_fa;
    res.link = foundColor.link;

    return res;
  }
}
