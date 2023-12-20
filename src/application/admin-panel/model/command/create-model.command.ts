import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Model } from 'src/domain/model/entity/model.entity';
import { IModelRepository } from 'src/domain/model/interface/IModel.repository';

export class CreateModelCommand {
  constructor(
    public name: string,
    public brand: string,
  ) {}
}

@CommandHandler(CreateModelCommand)
export class CreateModelHandler implements ICommandHandler<CreateModelCommand> {
  constructor(
    @Inject(IModelRepository)
    private readonly modelRepository: IModelRepository,
  ) {}

  async execute(command: CreateModelCommand): Promise<void> {
    let newModel = new Model();
    newModel.brand = command.brand;
    newModel.name = command.name;
    this.modelRepository.createOne(newModel);
  }
}
