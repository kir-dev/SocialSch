import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';

export class FollowerResponseDto {
  @ValidateNested()
  @Type(() => UserDto)
  follower: UserDto;

  constructor(partial: Partial<FollowerResponseDto>) {
    Object.assign(this, partial);
  }
}
