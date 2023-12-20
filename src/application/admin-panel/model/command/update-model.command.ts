import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IModelRepository } from 'src/domain/model/interface/IModel.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class UpdateModelCommand {
  constructor(
    public id: string,
    public name: string,
    public brand: string,
  ) {}
}
@CommandHandler(UpdateModelCommand)
export class UpdateModelHandler implements ICommandHandler<UpdateModelCommand> {
  constructor(
    @Inject(IModelRepository)
    private readonly modelRepository: IModelRepository,
  ) {}

  async execute(command: UpdateModelCommand): Promise<void> {
    let foundModel = await this.modelRepository.findOne(command.id);
    if (!foundModel) throw new NotFoundException(NotFoundExceptionMessage);

    if (!!command.name) foundModel.name = command.name;

    if (!!command.brand) {
      foundModel.brand = command.brand;
    }

    await this.modelRepository.updateOne(foundModel.id, foundModel);
  }
}
