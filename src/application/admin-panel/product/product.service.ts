import { Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/domain/product/entity/product';
import { IProductRepository } from 'src/domain/product/interface/IProduct.repository';
import { Price } from 'src/domain/product/entity/price';

@Injectable()
export default class ProductService {
  constructor(
    @Inject(IProductRepository)
    private productRepo: IProductRepository,
  ) {}

  getProductPrimaryImage(product: Product) {
    let image = product.images.find((image) => {
      return image.is_primary;
    });
    if (image) {
      return image;
    } else {
      return product.images[0];
    }
  }

  calculateProductPrice(productPiceDto: Price): number {
    let price_to_pay: number = productPiceDto.sale.is_on_sale
      ? productPiceDto.price -
        (productPiceDto.price * productPiceDto.sale.off_percent) / 100
      : productPiceDto.price;

    return price_to_pay;
  }
}
