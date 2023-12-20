import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBrandRepository } from 'src/domain/brand/interface/IBrand.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';

export class MoveDownBrandFaqCommand {
  constructor(
    public brand_id: string,
    public id: string,
  ) {}
}

@CommandHandler(MoveDownBrandFaqCommand)
export class MoveDownBrandFaqHandler
  implements ICommandHandler<MoveDownBrandFaqCommand>
{
  constructor(
    @Inject(IBrandRepository)
    private readonly brandRepository: IBrandRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: MoveDownBrandFaqCommand): Promise<void> {
    let foundBrand = await this.brandRepository.findOne(command.brand_id);
    if (!foundBrand) throw new NotFoundException(NotFoundExceptionMessage);

    foundBrand.faq_list = this.faqRepository.moveDownFaq(
      command.id,
      foundBrand.faq_list,
    );

    this.brandRepository.updateOne(foundBrand.id, foundBrand);
  }
}
