import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  image_cover: string;

  description: string;

  @IsNotEmpty()
  url: string;

  @IsArray()
  @IsUUID('4', { each: true })
  stackIds: string[];
}
