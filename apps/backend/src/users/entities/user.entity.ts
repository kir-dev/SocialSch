import { IsEmail, IsString } from 'class-validator';

export class User {
  @IsString()
  userId: string;
  @IsEmail()
  email: string;
  @IsString()
  username: string;
}
