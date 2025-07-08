import { PostEntity } from '../entities/post.entity';
import { IsArray, ValidateNested } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { CommentEntity } from '../../comments/entities/comment.entity';

export class PostWithAuthANdCommentDto extends PostEntity {
  @ValidateNested()
  author: User;

  @IsArray()
  @ValidateNested({ each: true })
  comments: CommentEntity[];
}
