import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, IsString, IsOptional, IsNumber, Min, IsUrl, MaxLength, IsArray, ArrayMaxSize, ArrayMinSize, IsInt, IsUUID, IsBoolean } from 'class-validator';

export class ProductDto {
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
  @IsString({ message: 'mainPhoto must be a text' })
  mainPhoto: string;

  @IsArray({ message: 'photos must be an array' })
  @ArrayMinSize(1, { message: 'photos must contain at least 1 item' })
  @ArrayMaxSize(10, { message: 'photos: max 10 items' })
  @IsString({ each: true, message: 'each photo must be a text' })
  photos: string[];

  @IsInt({ message: 'sortOrder must be an integer' })
  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: 'sortOrder cannot be negative' })
  sortOrder?: number;

  @Type(() => Number)
  @IsInt({ message: 'price must be an integer' })
  @Min(0, { message: 'price cannot be negative' })
  price: number;

  @IsOptional()
  @IsBoolean()
  inStock: boolean;

  @IsArray({ message: 'categories must be an array' })
  @ArrayMinSize(1, { message: 'categories must contain at least 1 id' })
  @IsUUID('4', { each: true, message: 'each category must be a valid UUID v4' })
  categories: string[]
}


