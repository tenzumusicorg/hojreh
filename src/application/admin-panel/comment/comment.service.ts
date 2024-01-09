import { Inject, Injectable } from '@nestjs/common';
import { CommentStatusEnum } from 'src/domain/product/constant/comment-status.enum';
import { Rating } from 'src/domain/product/entity/rate';
import { ICommentRepository } from 'src/domain/product/interface/IComment.repository';
import { IProductRepository } from 'src/domain/product/interface/IProduct.repository';

@Injectable()
export default class CommentService {
  constructor(
    @Inject(IProductRepository)
    private productRepository: IProductRepository,
    @Inject(ICommentRepository)
    private productCommentRepository: ICommentRepository,
  ) {}

  async updateProductRating(product_id: string) {
    let foundProduct = await this.productRepository.findOne(product_id);
    if (!!foundProduct) {
      let productComments = await this.findByProduct(foundProduct.id);
      productComments = productComments.filter((comment) => {
        return comment.status === CommentStatusEnum.CONFIRMED;
      });
      let commentsRating = productComments.map((element) => {
        return {
          rating_score: element.rating_score,
          rating_stars: element.rating_stars,
        };
      });

      let totalScore = 0;
      let totalStars = 0;
      commentsRating.forEach((ratingItem) => {
        totalScore += ratingItem.rating_score;
        totalStars += ratingItem.rating_stars;
      });

      let productRating: Rating = {
        total_ratings: commentsRating.length,
        score: totalScore / commentsRating.length,
        stars: totalStars / commentsRating.length,
      };

      foundProduct.rating = productRating;
      this.productRepository.updateOne(foundProduct.id, foundProduct);
    }
  }

  async findByProduct(product_id: string) {
    return await this.productCommentRepository.model().find({
      product_id,
    });
  }
}
