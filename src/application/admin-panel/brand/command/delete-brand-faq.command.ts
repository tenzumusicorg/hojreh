import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBrandRepository } from 'src/domain/brand/interface/IBrand.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';

export class DeleteBrandFaqCommand {
  constructor(
    public brand_id: string,
    public id: string,
  ) {}
}

@CommandHandler(DeleteBrandFaqCommand)
export class DeleteBrandFaqHandler
  implements ICommandHandler<DeleteBrandFaqCommand>
{
  constructor(
    @Inject(IBrandRepository)
    private readonly brandRepository: IBrandRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: DeleteBrandFaqCommand): Promise<void> {
    let foundBrand = await this.brandRepository.findOne(command.brand_id);
    if (!foundBrand) throw new NotFoundException(NotFoundExceptionMessage);

    foundBrand.faq_list = this.faqRepository.deleteFaq(
      command.id,
      foundBrand.faq_list,
    );

    this.brandRepository.updateOne(foundBrand.id, foundBrand);
  }
}
