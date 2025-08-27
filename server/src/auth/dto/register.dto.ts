import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsEnum, IsPhoneNumber } from 'class-validator';
import { UserRole } from '@prisma/client';

export class RegisterDto {
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

  @MinLength(6) 
  password: string;

  @IsOptional() 
  @IsEnum(UserRole) 
  role?: UserRole; 
}
