import {
  SEARCH_FORMAT_VALIDATION,
  SORT_FORMAT_VALIDATION,
} from '@/src/utils/consts';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'Название задачи', required: true })
  @IsString()
  @Length(1, 64)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Подробное описание задачи', required: false })
  @Length(1, 256)
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateTaskDto {
  @ApiProperty({ description: 'Название задачи', required: true })
  @IsString()
  @Length(1, 64)
  @IsOptional()
  name: string;

  @ApiProperty({ description: 'Подробное описание задачи', required: false })
  @Length(1, 256)
  @IsString()
  @IsOptional()
  description?: string;
}

export class SearchTasksDto {
  @ApiProperty({
    description:
      'Поле поиска. Должно быть в формате "field:value", где field - поле, по которому будет осуществлен поиск, а value - значение поля',
    required: false,
  })
  @Matches(/^[\w]+:[\w]+$/, {
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
