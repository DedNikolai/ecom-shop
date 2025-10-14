import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, IsString, IsOptional, IsNumber, Min, IsUrl, MaxLength } from 'class-validator';

export class CategoryDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'title must be a text' })
  @MinLength(3, { message: 'title: mmin 2 symbols' })
  @MaxLength(120, { message: 'title: max 120 symbols' })
  title: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString({ message: 'metaTitle must be a text' })
  @MaxLength(60, { message: 'metaTitle: max 60 symbols' })
  metaTitle?: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString({ message: 'url must be a text' })
  @MaxLength(60, { message: 'url: max 60 symbols' })
  url?: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'description must be a text' })
  @MinLength(10, { message: 'description: min 10 symbols' })
  @MaxLength(2000, { message: 'description: max 2000 symbols' })
  description: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString({ message: 'metaDescription must be a text' })
  @MaxLength(160, { message: 'metaDescription: max 160 symbols' })
  metaDescription?: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({message: "Title is reqiured"})
  photo: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: 'sortOrder cannot be negative' })
  sortOrder?: number;
}


