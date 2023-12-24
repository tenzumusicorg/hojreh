import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Color } from 'src/domain/color/entity/color.entity';
import { IColorRepository } from 'src/domain/color/interface/IColor.repository';

export class CreateColorCommand {
  constructor(
    public color_en: string,
    public color_fa: string,
    public link: string,
  ) {}
}
@CommandHandler(CreateColorCommand)
export class CreateColorHandler implements ICommandHandler<CreateColorCommand> {
  constructor(
    @Inject(IColorRepository)
    private readonly colorRepository: IColorRepository,
  ) {}

  async execute(command: CreateColorCommand): Promise<void> {
    let color = new Color();
    color.color_en = command.color_en;
    color.color_fa = command.color_fa;
    color.link = command.link;

    this.colorRepository.createOne(color);
  }
}
