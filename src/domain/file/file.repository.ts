import { Injectable } from '@nestjs/common';
import { File } from './entity/file.entity';

@Injectable()
export default class FileRepository {
  constructor() {}

  createFile(mimType: string, size: number, url: string) {
    let file = new File();
    file.size = size;
    file.url = url;
    file.mim_type = mimType;

    return file;
  }
}
