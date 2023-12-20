import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBrandRepository } from 'src/domain/brand/interface/IBrand.repository';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';

export class AddBrandFaqCommand {
  constructor(
    public brand_id: string,
    public answer: DualLanguageText,
    public question: DualLanguageText,
  ) {}
}

@CommandHandler(AddBrandFaqCommand)
export class AddBrandFaqHandler implements ICommandHandler<AddBrandFaqCommand> {
  constructor(
    @Inject(IBrandRepository)
    private readonly brandRepository: IBrandRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: AddBrandFaqCommand): Promise<void> {
    let foundBrand = await this.brandRepository.findOne(command.brand_id);
    if (!foundBrand) throw new NotFoundException(NotFoundExceptionMessage);

    foundBrand.faq_list = this.faqRepository.createFaq(
      { answer: command.answer, question: command.question },
      foundBrand.faq_list,
    );

    this.brandRepository.updateOne(foundBrand.id, foundBrand);
  }
}
