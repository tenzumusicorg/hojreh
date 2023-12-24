import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IColorRepository } from 'src/domain/color/interface/IColor.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class UpdateColorCommand {
  constructor(
    public id: string,
    public color_en: string,
    public color_fa: string,
    public link: string,
  ) {}
}
@CommandHandler(UpdateColorCommand)
export class UpdateColorHandler implements ICommandHandler<UpdateColorCommand> {
  constructor(
    @Inject(IColorRepository)
    private readonly colorRepository: IColorRepository,
  ) {}

  async execute(command: UpdateColorCommand): Promise<void> {
    let foundColor = await this.colorRepository.findOne(command.id);
    if (!foundColor) throw new NotFoundException(NotFoundExceptionMessage);

    if (!!command.color_en) foundColor.color_en = command.color_en;
    if (!!command.color_fa) foundColor.color_fa = command.color_fa;
    if (!!command.link) foundColor.link = command.link;

    await this.colorRepository.updateOne(foundColor.id, foundColor);
  }
}
