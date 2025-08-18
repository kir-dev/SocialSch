import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateLikeDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsPositive()
  postId: number;
}
