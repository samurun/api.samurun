import { Project } from '../../projects/entities/project.entity';
export declare class DashboardDto {
    project: number;
    user: number;
    stack: number;
    recent_projects: Project[];
    stacks: any[];
}
