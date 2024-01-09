import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { CommentDto } from '../dto/comment.dto';
import { ICommentRepository } from 'src/domain/product/interface/IComment.repository';
import { Inject } from '@nestjs/common';
import { PaginateOptions } from 'mongoose';
import { PaginationParams } from 'src/domain/database/pagination-params.interface';
import { CommentStatusEnum } from 'src/domain/product/constant/comment-status.enum';
import { CommentListDto } from '../dto/comment-list.dto';
import { ProductDetailQuery } from '../../product/query/product-detail.query';
import { User } from 'src/domain/user/entity/user';

export class CommentListQuery {
  constructor(
    public readonly pagination: PaginationParams,
    public filter: CommentStatusEnum,
  ) {}
}

@QueryHandler(CommentListQuery)
export class CommentListHandler implements IQueryHandler<CommentListQuery> {
  constructor(
    @Inject(ICommentRepository)
    private commentRepository: ICommentRepository,
    private queryBus: QueryBus,
  ) {}

  async execute(query: CommentListQuery): Promise<any> {
    const options: PaginateOptions = {
      select: [
        '_id',
        'product_id',
        'user_id',
        'title',
        'status',
        'body',
        'rating_stars',
        'rating_score',
        'date',
      ],
      populate: [
        {
          path: 'user_id',
          model: 'User',
        },
      ],
      page: query.pagination.page,
      limit: query.pagination.limit,
      sort: { date: -1 },
    };

    let commentQuery = {};
    if (!!query.filter)
      commentQuery = {
        status: query.filter,
      };

    let foundCommentList = await this.commentRepository
      .model()
      .paginate(commentQuery, options);

    let res = new CommentListDto();
    res.items = new Array<CommentDto>();
    for await (const resultItem of foundCommentList.docs) {
      let foundProduct = await this.queryBus.execute(
        new ProductDetailQuery('', resultItem.product_id),
      );
      if (!!foundProduct) {
        let comment = new CommentDto();
        comment.id = resultItem.id;
        comment.body = resultItem.body;
        comment.status = resultItem.status;
        comment.title = resultItem.title;
        comment.product = {
          id: foundProduct.id,
          images: foundProduct.images,
          name: foundProduct.name,
          category: foundProduct.category,
          brand: foundProduct.brand,
          price: foundProduct.price,
        };
        comment.rating = {
          score: resultItem.rating_score,
          stars: resultItem.rating_stars,
        };
        comment.date = resultItem.date;
        let user = resultItem as unknown as User;
        comment.user = {
          name: `${user.first_name}  ${user.last_name}`,
          purchased_before: true, //await this.orderService.isUserPurchased(user.id),
        };
        res.items.push(comment);
      }
    }

    let currentDate = new Date();
    let lastMonthDate = new Date(
      currentDate.setMonth(currentDate.getMonth() - 1),
    );
    res.total_comments_in_month = await this.commentRepository
      .model()
      .countDocuments({
        $and: [
          {
            createdAt: { $gte: lastMonthDate },
          },
          {
            createdAt: { $lte: new Date() },
          },
        ],
      });

    res.total_comments = await this.commentRepository.model().countDocuments();
    res.total_confirmed_comments = await this.commentRepository
      .model()
      .countDocuments({
        status: CommentStatusEnum.CONFIRMED,
      });
    res.total_rejected_comments = await this.commentRepository
      .model()
      .countDocuments({
        status: CommentStatusEnum.REJECTED,
      });

    return res;
  }
}
