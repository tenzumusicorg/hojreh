import { Module } from '@nestjs/common';
import FileRepository from './file.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [FileRepository],
  exports: [FileRepository],
})
export default class FileDomainModule {}
