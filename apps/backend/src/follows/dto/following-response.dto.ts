import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';

export class FollowingResponseDto {
  @ValidateNested()
  @Type(() => UserDto)
  following: UserDto;

  constructor(partial: Partial<FollowingResponseDto>) {
    Object.assign(this, partial);
  }
}
