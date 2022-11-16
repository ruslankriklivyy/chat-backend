import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  full_name: string;
}

export class UpdateUserDto {
  @IsString()
  full_name: string;

  @IsBoolean()
  is_online: boolean;
}
