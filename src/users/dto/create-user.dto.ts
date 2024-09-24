import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
