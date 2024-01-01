import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import FaqContentDto from '../../dto/faq/get-faq-content.dto';

export class FaqContentQuery {
  constructor() {}
}

@QueryHandler(FaqContentQuery)
export class FaqContentHandler implements IQueryHandler<FaqContentQuery> {
  constructor(private readonly staticRepository: StaticsRepository) {}

  async execute(query: FaqContentQuery) {
    let faqContent = await this.staticRepository.getFAQContent();
    let res = new FaqContentDto();
    if (faqContent) {
      res.id = faqContent.id;
      res.content = faqContent.content;
      res.faq_list = faqContent.faq_list;
    }
    return res;
  }
}
