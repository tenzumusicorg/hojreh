import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { FAQItem } from 'src/domain/faq/entity/faq-item.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import { FaqItemDto } from './dto/faq-dto';

@Injectable()
export default class FaqRepository {
  constructor() {}

  createFaq(createDto: CreateFaqDto, faqList: Array<FAQItem>) {
    let faq = new FAQItem();
    faq.answer = createDto.answer;
    faq.question = createDto.question;
    faq.id = new Types.ObjectId().toHexString();

    faqList.push(faq);
    return faqList;
  }

  updateFaq(updateDto: FaqItemDto, faqList: Array<FAQItem>) {
    let foundFaq = faqList.find((element) => updateDto.id === element.id);
    if (!foundFaq)
      throw new NotFoundException('faq not found with this id for this source');
    foundFaq.answer = updateDto.answer;
    foundFaq.question = updateDto.question;

    return faqList;
  }

  deleteFaq(id: string, faqList: Array<FAQItem>) {
    let faqIndex = faqList.findIndex((element) => id === element.id);
    if (faqIndex === -1)
      throw new NotFoundException('faq not found with this id for this source');

    faqList.splice(faqIndex, 1);

    return faqList;
  }

  moveUpFaq(id: string, faqList: Array<FAQItem>) {
    let faqIndex = faqList.findIndex((element) => id === element.id);
    if (faqIndex === -1)
      throw new NotFoundException('faq not found with this id for this source');

    if (faqIndex === 0)
      throw new NotFoundException('faq is already at the top.');

    [faqList[faqIndex], faqList[faqIndex - 1]] = [
      faqList[faqIndex - 1],
      faqList[faqIndex],
    ];

    return faqList;
  }

  moveDownFaq(id: string, faqList: Array<FAQItem>) {
    let faqIndex = faqList.findIndex((element) => id === element.id);
    if (faqIndex === -1)
      throw new NotFoundException('faq not found with this id for this source');

    if (faqIndex === faqList.length - 1)
      throw new NotFoundException('faq is already at the bottom.');

    [faqList[faqIndex], faqList[faqIndex + 1]] = [
      faqList[faqIndex + 1],
      faqList[faqIndex],
    ];

    return faqList;
  }
}
