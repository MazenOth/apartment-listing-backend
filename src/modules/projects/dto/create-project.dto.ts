import { IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitizeInput } from 'src/utils/sanitize';

export class CreateProjectDto {
  @IsString()
  @Length(3, 100, {
    message: 'Project name must be between 3 and 100 characters',
  })
  @Transform(({ value }) => sanitizeInput(value))
  projectName: string;

  @IsString()
  @Length(5, 255, { message: 'Address must be between 5 and 255 characters' })
  @Transform(({ value }) => sanitizeInput(value))
  address: string;
}
