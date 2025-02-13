import { IsNotEmpty, IsNumber, IsString, Min, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitizeInput } from 'src/utils/sanitize';

export class CreateApartmentDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50, { message: 'Unit name must be between 3 and 50 characters' })
  @Transform(({ value }) => sanitizeInput(value))
  unitName: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 20, { message: 'Unit number must be between 1 and 20 characters' })
  @Transform(({ value }) => sanitizeInput(value))
  unitNumber: string;

  @IsNumber()
  @Min(0, { message: 'Price must be at least 0' })
  price: number;

  @IsNotEmpty()
  @IsString()
  @Length(10, 500, {
    message: 'Description must be between 10 and 500 characters',
  })
  @Transform(({ value }) => sanitizeInput(value))
  description: string;

  @IsNumber()
  @Min(0, { message: 'Size in SQM must be at least 0' })
  sizeSQM: number;

  @IsNumber()
  @Min(0, { message: 'Bedrooms must be at least 0' })
  bedrooms: number;

  @IsNumber()
  @Min(0, { message: 'Bathrooms must be at least 0' })
  bathrooms: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Project ID must be a positive number' })
  projectId: number;
}
