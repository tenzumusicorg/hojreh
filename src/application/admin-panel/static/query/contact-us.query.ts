import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import ContactUsContentDto from '../dto/get-contact-us.dto';

export class ContactUsQuery {
  constructor() {}
}

@QueryHandler(ContactUsQuery)
export class ContactUsHandler implements IQueryHandler<ContactUsQuery> {
  constructor(private readonly staticRepository: StaticsRepository) {}

  async execute(query: ContactUsQuery) {
    let contactUsContent = await this.staticRepository.getContactUsContent();
    let res = new ContactUsContentDto();
    if (contactUsContent) {
      res.id = contactUsContent.id;
      res.address = contactUsContent.address;
      res.work_hours = contactUsContent.work_hours;
      res.call_numbers = contactUsContent.call_numbers;
    }
    return res;
  }
}
