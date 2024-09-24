import { IsNumber } from 'class-validator';
import { Project } from '../../projects/entities/project.entity';

export class DashboardDto {
  @IsNumber()
  project: number;

  @IsNumber()
  user: number;

  @IsNumber()
  stack: number;

  recent_projects: Project[];
  stacks: any[];
}
