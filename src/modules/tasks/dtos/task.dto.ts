import {
  SEARCH_FORMAT_VALIDATION,
  SORT_FORMAT_VALIDATION,
} from '@/src/utils/consts';
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
  @IsString()
  @Length(1, 64)
  @IsNotEmpty()
  name: string;

  @Length(1, 256)
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateTaskDto {
  @IsString()
  @Length(1, 64)
  @IsOptional()
  name: string;

  @Length(1, 256)
  @IsString()
  @IsOptional()
  description?: string;
}

export class SearchTasksDto {
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
