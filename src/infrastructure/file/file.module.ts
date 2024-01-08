import { Global, Module, OnModuleInit } from '@nestjs/common';
import FileService from './file.service';
import S3Service from './s3.service';
import { ExcelService } from './execl.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [FileService, S3Service, ExcelService],
  exports: [FileService, ExcelService],
})
export class FileModule implements OnModuleInit {
  constructor(private readonly fileService: FileService) {}

  async onModuleInit() {
    await this.fileService.initBucket();
  }
}
