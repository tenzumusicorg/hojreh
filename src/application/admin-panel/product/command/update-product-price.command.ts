import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IProductRepository } from 'src/domain/product/interface/IProduct.repository';
import { UpdateProductPriceItemDto } from '../dto/update-prices.dto';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class UpdateProductPriceCommand {
  constructor(public products: Array<UpdateProductPriceItemDto>) {}
}

@CommandHandler(UpdateProductPriceCommand)
export class UpdateProductPriceHandler
  implements ICommandHandler<UpdateProductPriceCommand>
{
  constructor(
    @Inject(IProductRepository)
    private productRepo: IProductRepository,
  ) {}

  async execute(command: UpdateProductPriceCommand): Promise<void> {
    for await (const productPriceRequest of command.products) {
      let foundProduct = await this.productRepo.findOne(productPriceRequest.id);
      if (!foundProduct) throw new NotFoundException(NotFoundExceptionMessage);

      foundProduct.price.call_to_buy = productPriceRequest.call_to_buy;
      foundProduct.price.is_competitive = productPriceRequest.is_competitive;
      foundProduct.availability.total_count = productPriceRequest.total_count;
      foundProduct.price.price = productPriceRequest.price;

      if (productPriceRequest.total_count === 0)
        foundProduct.availability.is_available = false;

      await this.productRepo.updateOne(productPriceRequest.id, foundProduct);
    }
  }
}
