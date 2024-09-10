import { PASSWORD_REGULAR_VALIDATION } from '@/src/utils/consts';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 256)
  @IsNotEmpty()
  name: string;

  @Length(1, 256)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Matches(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
    {
      message: PASSWORD_REGULAR_VALIDATION.message,
    },
  )
  @Length(8, 256)
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @IsString()
  @Length(1, 256)
  @IsOptional()
  name?: string;

  @Length(1, 256)
  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;

  @Matches(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
    {
      message: PASSWORD_REGULAR_VALIDATION.message,
    },
  )
  @Length(8, 256)
  @IsString()
  @IsOptional()
  password?: string;
}
