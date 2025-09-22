import { IsString, IsEmail } from 'class-validator';

export class UserDto {
  @IsString()
  authSchId: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
