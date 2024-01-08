import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IProductRepository } from 'src/domain/product/interface/IProduct.repository';
import { ExcelService } from 'src/infrastructure/file/execl.service';

export class ProductExcelListQuery {
  constructor(public category: string) {}
}

@CommandHandler(ProductExcelListQuery)
export class ProductExcelListHandler
  implements ICommandHandler<ProductExcelListQuery>
{
  constructor(
    @Inject(IProductRepository)
    private productRepo: IProductRepository,
    private excelService: ExcelService,
  ) {}

  async execute(query: ProductExcelListQuery) {
    let excelQuery = {};
    if (!!query.category) {
      excelQuery = { category: query.category };
    }
    let foundProducts = (await this.productRepo
      .model()
      .find(query)
      .populate({
        path: 'category',
        model: 'Category',
      })
      .populate({
        path: 'subcategory',
        model: 'SubCategory',
      })
      .populate({
        path: 'tags',
        model: 'Tag',
      })
      .populate({
        path: 'brand',
        model: 'Brand',
      })
      .populate({
        path: 'model_id',
        populate: { path: 'brand', model: ' Brand' },
        model: 'Model',
      })
      .lean()) as any;

    let columns = [
      { header: 'Product Id', key: 'id', width: 25 },
      { header: 'Name', key: 'name', width: 45 },
      { header: 'Brand', key: 'brand', width: 25 },
      { header: 'Model', key: 'model', width: 25 },
      { header: 'Category', key: 'category', width: 25 },
      { header: 'SubCategory', key: 'subcategory', width: 25 },
      { header: 'Tag', key: 'tag', width: 25 },
      { header: 'Price', key: 'price', width: 15 },
      { header: 'Call To Buy', key: 'call_to_buy', width: 10 },
      { header: 'Off Percent', key: 'off_percent', width: 10 },
      { header: 'Is Competitive', key: 'is_competitive', width: 15 },
      { header: 'Availability', key: 'availability', width: 10 },
      { header: 'Count', key: 'count', width: 10 },
    ];
    let productExcelData = foundProducts.map((product) => {
      return {
        id: product.id,
        name: product.name,
        brand: product.brand.name.fa,
        model: product.model_id.name,
        category: product.category.title.fa,
        subcategory: product.subcategory.title.fa,
        tag: product.tags
          .map((element) => {
            return element.title.fa;
          })
          .join(','),
        price: product.price.price,
        call_to_buy: product.price.call_to_buy,
        off_percent: product.price.sale.off_percent,
        is_competitive: product.price.is_competitive,
        availability: product.availability.is_available,
        count: product.availability.total_count,
      };
    });
    let excelBuffer = await this.excelService.createExcel({
      data: productExcelData,
      columns,
      file_name: 'products',
    });

    return excelBuffer;
  }
}
