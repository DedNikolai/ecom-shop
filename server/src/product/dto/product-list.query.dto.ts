import { IsInt, Min, Max, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductListQueryDto {
  @IsOptional()
  @IsUUID('4', { message: 'categoryId must be UUID v4' })
  categoryId?: string;

  @Type(() => Number)
  @IsInt() @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsInt() @Min(1) @Max(100)
  limit: number = 10;
}
