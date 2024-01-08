import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IProductRepository } from 'src/domain/product/interface/IProduct.repository';
import { ExcelService } from 'src/infrastructure/file/execl.service';
import { UpdateProductPriceExcelItemDto } from '../dto/update-prices.dto';
import { ValidationError, validate } from 'class-validator';
import ValidationExceptions from 'src/infrastructure/middleware/exceptions/validation.exceptions';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class UpdateProductPriceByExcelCommand {
  constructor(public excelBuffer: Buffer) {}
}

@CommandHandler(UpdateProductPriceByExcelCommand)
export class UpdateProductPriceByExcelHandler
  implements ICommandHandler<UpdateProductPriceByExcelCommand>
{
  constructor(
    @Inject(IProductRepository)
    private productRepo: IProductRepository,
    private excelService: ExcelService,
  ) {}

  async execute(command: UpdateProductPriceByExcelCommand): Promise<void> {
    const columns: string[] = [
      'Product Id',
      'Name',
      'Brand',
      'Model',
      'Category',
      'SubCategory',
      'Tag',
      'Price',
      'Call To Buy',
      'Off Percent',
      'Is Competitive',
      'Availability',
      'Count',
    ];

    const productData = await this.excelService.importExcelData(
      command.excelBuffer,
      columns,
    );

    let productsUpdateDto = new Array<UpdateProductPriceExcelItemDto>();
    for await (const element of productData) {
      let productDto = {
        id: element['Product Id'],
        call_to_buy: element['Call To Buy'],
        is_competitive: element['Is Competitive'],
        price: element['Price'],
        total_count: element['Count'],
        off_percent: element['Off Percent'],
      } as UpdateProductPriceExcelItemDto;
      const errors = (await validate(
        new UpdateProductPriceExcelItemDto(productDto),
      )) as ValidationError[];

      if (errors.length > 0) throw new ValidationExceptions(errors);

      productsUpdateDto.push(productDto);
    }

    for await (const productPriceRequest of productsUpdateDto) {
      let foundProduct = await this.productRepo.findOne(productPriceRequest.id);
      if (!foundProduct) throw new NotFoundException(NotFoundExceptionMessage);

      foundProduct.price.price = productPriceRequest.price;
      foundProduct.price.call_to_buy = productPriceRequest.call_to_buy;
      foundProduct.price.sale.off_percent = productPriceRequest.off_percent;
      if (productPriceRequest.off_percent === 0) {
        foundProduct.price.sale.is_on_sale = false;
      }
      foundProduct.price.is_competitive = productPriceRequest.is_competitive;
      foundProduct.availability.total_count = productPriceRequest.total_count;
      if (productPriceRequest.total_count === 0) {
        foundProduct.availability.is_available = false;
      }
      await this.productRepo.updateOne(productPriceRequest.id, foundProduct);
    }
  }
}
