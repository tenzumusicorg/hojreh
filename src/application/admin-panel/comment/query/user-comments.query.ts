import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { ICommentRepository } from 'src/domain/product/interface/IComment.repository';
import {
  UserCommentItemDto,
  UserCommentListDto,
} from '../dto/user-comments.dto';
import { ProductDetailQuery } from '../../product/query/product-detail.query';

export class UserCommentListQuery {
  constructor(public readonly user_id: string) {}
}

@QueryHandler(UserCommentListQuery)
export class UserCommentListHandler
  implements IQueryHandler<UserCommentListQuery>
{
  constructor(
    @Inject(ICommentRepository)
    private commentRepository: ICommentRepository,
    private queryBus: QueryBus,
  ) {}

  async execute(query: UserCommentListQuery): Promise<any> {
    const userCommentsQueryResult = await this.commentRepository
      .model()
      .paginate(
        {
          $and: [{ user_id: query.user_id }, { is_deleted: false }],
        },
        { sort: { date: -1 } },
      );
    let res = new UserCommentListDto();
    res.items = new Array<UserCommentItemDto>();
    for await (const commentItem of userCommentsQueryResult.docs) {
      let productDetail = await this.queryBus.execute(
        new ProductDetailQuery('', commentItem.product_id),
      );
      res.items.push({
        id: commentItem.id,
        body: commentItem.body,
        title: commentItem.title,
        likes: commentItem.likes,
        status: commentItem.status,
        date: commentItem.date,
        dis_likes: commentItem.dislikes,
        rating: {
          score: commentItem.rating_score,
          stars: commentItem.rating_stars,
        },
        product: productDetail,
      });
    }
    return res;
  }
}
