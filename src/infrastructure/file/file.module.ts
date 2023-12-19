import { Global, Module, OnModuleInit } from '@nestjs/common';
import FileService from './file.service';
import S3Service from './s3.service';

@Global()
@Module({
  imports: [
  ],
  controllers: [],
  providers: [FileService, S3Service],
  exports: [FileService],
})
export class FileModule implements OnModuleInit {
  constructor(private readonly fileService: FileService) {}

  async onModuleInit() {
    await this.fileService.initBucket();
  }
}
