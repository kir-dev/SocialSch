import { IsEmail, IsString } from 'class-validator';

export class User {
  @IsString()
  authSchId: string;
  @IsEmail()
  email: string;
  @IsString()
  username: string;
}
