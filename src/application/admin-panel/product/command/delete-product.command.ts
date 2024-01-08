import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IProductRepository } from 'src/domain/product/interface/IProduct.repository';
import { UpdateProductPriceItemDto } from '../dto/update-prices.dto';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class DeleteProductCommand {
  constructor(public products: Array<UpdateProductPriceItemDto>) {}
}

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(
    @Inject(IProductRepository)
    private productRepo: IProductRepository,
  ) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    for await (const productPriceRequest of command.products) {
      let foundProduct = await this.productRepo.findOne(productPriceRequest.id);
      if (!foundProduct) throw new NotFoundException(NotFoundExceptionMessage);

      this.productRepo.deleteOne(foundProduct.id);
    }
  }
}
