import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsEnum, IsPhoneNumber, IsString } from 'class-validator';
import { UserRole } from '@prisma/client';

export class UpdateUserDto {
  @IsNotEmpty() 
  @MinLength(2, {message: 'At least 2 symbols'})
  firstName: string;

  @IsNotEmpty() 
  @MinLength(2, {message: 'At least 2 symbols'})
  lastName: string;

  @IsPhoneNumber()
  phone: string

  @IsEmail() 
  email: string;
}
