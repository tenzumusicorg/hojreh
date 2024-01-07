import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model as MongooseModel, PaginateModel, Types } from 'mongoose';
import { ProductGroup } from '../entity/product-group';
import { IProductGroupRepository } from '../interface/IProduct-group.repository';

@Injectable()
export class ProductGroupRepository implements IProductGroupRepository {
  constructor(
    @InjectModel('ProductGroup')
    private productGroupModel: MongooseModel<ProductGroup>,
    @InjectModel('ProductGroup')
    private pgModel: PaginateModel<ProductGroup>,
  ) {}

  async createOne(productGroup: ProductGroup) {
    return await this.productGroupModel.create({
      _id: new Types.ObjectId(),
      ...productGroup,
    });
  }

  async findByOwnerProduct(product_id: string) {
    return await this.productGroupModel.findOne({
      product_id,
    });
    // .populate({
    //   path: 'product_id',
    //   populate: [
    //     { path: 'images.url', model: PrivateFile.name },
    //     { path: 'images.thumbnail', model: PrivateFile.name },

    //     { path: 'category', model: Category.name },
    //     { path: 'subcategory', model: SubCategory.name },
    //     { path: 'tags', model: Tag.name },
    //     {
    //       path: 'brand',
    //       populate: {
    //         path: 'logo',
    //         model: PrivateFile.name,
    //       },
    //       model: Brand.name,
    //     },
    //     { path: 'model_id', model: Model.name },
    //     {
    //       path: 'color.base_color',
    //       populate: {
    //         path: 'link',
    //         model: PrivateFile.name,
    //       },
    //       model: Color.name,
    //     },
    //   ],
    //   model: UserProduct.name,
    // })
    // .populate({
    //   path: 'products',
    //   populate: [
    //     { path: 'images.url', model: PrivateFile.name },
    //     { path: 'images.thumbnail', model: PrivateFile.name },

    //     { path: 'category', model: Category.name },
    //     { path: 'subcategory', model: SubCategory.name },
    //     { path: 'tags', model: Tag.name },
    //     {
    //       path: 'brand',
    //       populate: {
    //         path: 'logo',
    //         model: PrivateFile.name,
    //       },
    //       model: Brand.name,
    //     },
    //     { path: 'model_id', model: Model.name },
    //     {
    //       path: 'color.base_color',
    //       populate: {
    //         path: 'link',
    //         model: PrivateFile.name,
    //       },
    //       model: Color.name,
    //     },
    //   ],
    //   model: UserProduct.name,
    // });
  }

  async findOne(id: string) {
    return await this.productGroupModel.findOne({
      _id: id,
    });
  }

  async find() {
    return await this.productGroupModel.find();
  }
  async updateOne(id: string, entity: Partial<ProductGroup>) {
    await this.productGroupModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...entity,
        },
      },
    );
  }

  async deleteOne(id: string) {
    return await this.productGroupModel.deleteOne({
      _id: id,
    });
  }

  model() {
    return this.pgModel;
  }
}
