import { CommentStatusEnum } from '../constant/comment-status.enum';

export class Comment {
  id: string;
  product_id: string;
  user_id: string;
  title: string;
  body: string;
  status: CommentStatusEnum;
  likes: number;
  dislikes: number;
  rating_stars: number;
  rating_score: number;
  date: Date;
  is_deleted: Boolean;
}
