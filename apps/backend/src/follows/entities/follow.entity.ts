import { IsNumber, IsPositive } from 'class-validator';

export class Follow {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsNumber()
  @IsPositive()
  followerId: number;

  @IsNumber()
  @IsPositive()
  followingId: number;
}
