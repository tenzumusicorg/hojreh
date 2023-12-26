import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';


export class UpdateVideoCommand {
  constructor(
    public video_id: string,
    public title: DualLanguageText,
    public category: DualLanguageText,
    public cover: string,
    public link: string,
    public duration: string,
    public category_link: string,

  ) { }
}
@CommandHandler(UpdateVideoCommand)
export class UpdateVideoHandler implements ICommandHandler<UpdateVideoCommand> {
  constructor(
    private readonly staticRepository: StaticsRepository,
  ) { }

  async execute(command: UpdateVideoCommand): Promise<void> {
    let foundVideo = await this.staticRepository.findVideoById(
      command.video_id,
    );
    if (!foundVideo) 
      throw new NotFoundException(NotFoundExceptionMessage);
    

    await this.staticRepository.updateVideo(command.video_id, { ...command });
  }
}
