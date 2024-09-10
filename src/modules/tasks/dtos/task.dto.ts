import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

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
