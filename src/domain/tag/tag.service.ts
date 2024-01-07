import { Injectable } from '@nestjs/common';
import { Tag } from './entity/tag.entity';

@Injectable()
export default class TagService {
  constructor() {}

  checkTagIsComplete(tag: Tag): boolean {
    if (!tag.thumbnail || !tag.title.en) {
      return false;
    }
    return true;
  }
}
