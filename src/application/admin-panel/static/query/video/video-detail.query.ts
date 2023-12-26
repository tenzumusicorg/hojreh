import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import VideoDto from '../../dto/video/get-video-detail.dto';

export class VideoDetailQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(VideoDetailQuery)
export class VideoDetailHandler implements IQueryHandler<VideoDetailQuery> {
  constructor(private readonly staticRepository: StaticsRepository) {}

  async execute(query: VideoDetailQuery): Promise<VideoDto> {
    let foundVideo = await this.staticRepository.findVideoById(query.id);
    if (!foundVideo) 
      throw new NotFoundException(NotFoundExceptionMessage);
    

    let res = new VideoDto();
    res.id = foundVideo.id;
    res.title = foundVideo.title;
    res.category = foundVideo.category;
    res.cover = foundVideo.cover;
    res.link = foundVideo.link;
    res.duration = foundVideo.duration;
    res.category_link = foundVideo.category_link;

    return res;
  }
}
