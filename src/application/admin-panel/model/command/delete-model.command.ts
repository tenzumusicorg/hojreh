import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IModelRepository } from 'src/domain/model/interface/IModel.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class DeleteModelCommand {
  constructor(public id: string) {}
}

@CommandHandler(DeleteModelCommand)
export class DeleteModelHandler implements ICommandHandler<DeleteModelCommand> {
  constructor(
    @Inject(IModelRepository)
    private readonly modelRepository: IModelRepository,
  ) {}

  async execute(command: DeleteModelCommand): Promise<void> {
    let foundModel = await this.modelRepository.findOne(command.id);
    if (!foundModel) throw new NotFoundException(NotFoundExceptionMessage);

    this.modelRepository.deleteOne(foundModel.id);
  }
}
