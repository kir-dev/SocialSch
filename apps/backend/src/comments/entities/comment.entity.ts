import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';

export class CommentEntity {
  @IsInt()
  commentId: number;
  @IsInt()
  postId: number;

  @IsString()
  authorId: string;

  @IsString()
  content: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsBoolean()
  visible: boolean;
}
