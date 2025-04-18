import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';

export class PostEntity {
  @IsInt()
  postId: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsBoolean()
  visible: boolean;

  @IsString()
  authorId: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
