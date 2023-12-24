import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import ColorRepository from 'src/domain/color/repository/color.repository';
import { ColorItemDto, ColorListDto } from '../dto/color-list.dto';

export class ColorListQuery {
  constructor() {}
}

@QueryHandler(ColorListQuery)
export class ColorListHandler implements IQueryHandler<ColorListQuery> {
  constructor(private readonly ColorRepository: ColorRepository) {}

  async execute() {
    let foundColors = await this.ColorRepository.model().find();
    let res = new ColorListDto();
    res.items = new Array<ColorItemDto>();

    for await (const color of foundColors) {
      res.items.push({
        id: color.id,
        color_en: color.color_en,
        color_fa: color.color_fa,
        link: color.link,
      });
    }

    return res;
  }
}
