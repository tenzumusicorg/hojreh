import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IColorRepository } from 'src/domain/color/interface/IColor.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class DeleteColorCommand {
  constructor(public id: string) {}
}

@CommandHandler(DeleteColorCommand)
export class DeleteColorHandler implements ICommandHandler<DeleteColorCommand> {
  constructor(
    @Inject(IColorRepository)
    private readonly colorRepository: IColorRepository,
  ) {}

  async execute(command: DeleteColorCommand): Promise<void> {
    let foundColor = await this.colorRepository.findOne(command.id);
    if (!foundColor) throw new NotFoundException(NotFoundExceptionMessage);

    this.colorRepository.deleteOne(foundColor.id);
  }
}
