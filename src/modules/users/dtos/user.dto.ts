import {
  PASSWORD_REGULAR_VALIDATION,
  SEARCH_FORMAT_VALIDATION,
  SORT_FORMAT_VALIDATION,
} from '@/src/utils/consts';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'Имя пользователя', required: true })
  @IsString()
  @Length(1, 256)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Email пользователя', required: true })
  @Length(1, 256)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description:
      'Пароль пользователя. Должен быть длиной от 8 символов, включать цифры, заглавные буквы, строчные буквы и специальные символы',
    required: true,
  })
  @Matches(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[а-яА-Яa-zA-Z0-9!@#$%^&*]{8,}$/,
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
  @ApiProperty({ description: 'Имя пользователя', required: false })
  @IsString()
  @Length(1, 256)
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Email пользователя', required: false })
  @Length(1, 256)
  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description:
      'Пароль пользователя. Должен быть длиной от 8 символов, включать цифры, заглавные буквы, строчные буквы и специальные символы',
    required: true,
  })
  @Matches(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[а-яА-Яa-zA-Z0-9!@#$%^&*]{8,}$/,
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
  @ApiProperty({
    description:
      'Поле поиска. Должно быть в формате "field:value", где field - поле, по которому будет осуществлен поиск, а value - значение поля',
    required: false,
  })
  @Matches(/^[\w]+:[а-яА-Яa-zA-Z0-9!@#$%^&_*]+$/, {
    message: SEARCH_FORMAT_VALIDATION.message,
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({
    description:
      'Поле сортировки. Должно быть в формате "field:value", где field - поле, по которому будет осуществлена сортировка, а value - имеет значение "ASC"(от низких значений к высоким) или "DESK"(от высоких значений к низким)',
    required: false,
  })
  @Matches(/^[\w]+:[A-Z]+$/, {
    message: SORT_FORMAT_VALIDATION.message,
  })
  @IsString()
  @IsOptional()
  sort?: string;

  @ApiProperty({
    description: 'Номер запрашиваемой страницы',
    default: 1,
    required: false,
  })
  @IsPositive()
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    description: 'Количество записей на странице',
    default: 50,
    required: false,
  })
  @IsPositive()
  @IsNumber()
  @IsOptional()
  limit?: number = 50;
}
