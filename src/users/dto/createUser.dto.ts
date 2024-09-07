import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'Super' })
  @IsString({ message: 'first_name should be a string' })
  firstName: string;

  @ApiProperty({ default: 'Admin' })
  @IsString({ message: 'last_name should be a string' })
  lastName: string;

  fullName: string;

  password: string;

  @ApiProperty({ default: 'admin@yopmail.com' })
  @IsString({ message: 'email should be a string' })
  @IsNotEmpty({ message: 'email should not be empty' })
  email: string;
}
