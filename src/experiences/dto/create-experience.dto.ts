import { IsNotEmpty } from 'class-validator';

export class CreateExperienceDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  employment_type: string;

  @IsNotEmpty()
  company_name: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  location_type: string;

  @IsNotEmpty()
  start_date: Date;

  end_date: Date;

  description: string;
}
