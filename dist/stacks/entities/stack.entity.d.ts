import { Project } from '../../projects/entities/project.entity';
export declare class Stack {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    projects: Project[];
}
