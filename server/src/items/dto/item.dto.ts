import { IsUUID, IsString, IsNotEmpty, IsNumber, IsPositive, Min, MinLength } from 'class-validator';

export class ItemDto {

  @IsString({message: 'Must be a text'})
  @IsNotEmpty()
  @MinLength(4, {message: 'At least 4 symbols'})
  title: string;

  @IsNumber()
  @IsPositive()
  price: number;
}
