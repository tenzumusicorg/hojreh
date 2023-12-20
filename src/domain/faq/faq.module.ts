import { Module } from '@nestjs/common';
import FaqRepository from './faq.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [FaqRepository],
  exports: [FaqRepository],
})
export class FaqDomainModule {}
