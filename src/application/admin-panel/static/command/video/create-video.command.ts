import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { Video } from 'src/domain/static/entity/videos';
import StaticsRepository from 'src/domain/static/repository/statics.repository';


export class CreateVideoCommand {
  constructor(
    public title: DualLanguageText,
    public category: DualLanguageText,
    public cover: string,
    public link: string,
    public duration: string,
    public category_link: string,

  ) { }
}
@CommandHandler(CreateVideoCommand)
export class CreateVideoHandler implements ICommandHandler<CreateVideoCommand> {
  constructor(
    private readonly staticRepository: StaticsRepository,
  ) { }

  async execute(command: CreateVideoCommand): Promise<void> {
    let video = new Video()
    video.title = command.title
    video.category = command.category
    video.category_link = command.category_link
    video.duration = command.duration
    video.link = command.link
    video.cover =command.cover

    await this.staticRepository.createVideo(video);

  }
}
