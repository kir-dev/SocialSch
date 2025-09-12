import { IsNotEmpty, IsString } from 'class-validator';

export class Follow {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  followerId: string;

  @IsString()
  @IsNotEmpty()
  followingId: string;
}
