import { Injectable } from '@nestjs/common';
import { File } from './entity/file.entity';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export default class FileRepository {
  constructor() {}

  createFile(dto: CreateFileDto) {
    let file = new File();
    file.size = dto.size;
    file.url = dto.url;
    file.mim_type = dto.mimType;
    return file;
  }
}
