import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import VideoItemDto, { VideoListDto } from '../../dto/video/get-videos-list.dto';

export class VideoListQuery {
  constructor() {}
}

@QueryHandler(VideoListQuery)
export class VideoListHandler implements IQueryHandler<VideoListQuery> {
  constructor(private readonly staticsRepository: StaticsRepository) {}

  async execute() {
    let foundVideos = await this.staticsRepository.findAllVideos();
    let res = new VideoListDto();

    res.data = foundVideos.map((video) => {
      let videoListItem = new VideoItemDto();
      videoListItem.id = video.id;
      videoListItem.title = video.title;
      videoListItem.category = video.category;
      videoListItem.cover = video.cover;
      videoListItem.link = video.link;
      videoListItem.duration = video.duration;
      videoListItem.category_link = video.category_link;
      return videoListItem;
    });

    return res;
  }
}
