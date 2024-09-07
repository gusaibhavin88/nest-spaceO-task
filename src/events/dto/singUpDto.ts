import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsDateString()
  @IsNotEmpty()
  readonly startDate: string;

  @IsDateString()
  @IsNotEmpty()
  readonly endDate: string;

  @IsOptional()
  @IsString()
  readonly totalGuests?: number;

  @IsOptional()
  @IsString()
  readonly userId?: string; // Assuming userId is a UUID
}
