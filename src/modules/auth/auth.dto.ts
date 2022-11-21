import { IsEmail, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RefreshDto {
  @IsOptional()
  @IsString()
  refresh_token: string;
}

export class LogoutDto {
  @IsString()
  refresh_token: string;
}
