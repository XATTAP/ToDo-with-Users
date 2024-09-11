import { PASSWORD_REGULAR_VALIDATION, SEARCH_FORMAT_VALIDATION, SORT_FORMAT_VALIDATION } from '@/src/utils/consts';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
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

export class SearchUsersDto {
  @Matches(/^[\w]+:[\w]+$/, {
    message: SEARCH_FORMAT_VALIDATION.message,
  })
  @IsString()
  @IsOptional()
  search?: string;

  @Matches(/^[\w]+:[A-Z]+$/, {
    message: SORT_FORMAT_VALIDATION.message,
  })
  @IsString()
  @IsOptional()
  sort?: string;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  limit?: number = 50;
}
