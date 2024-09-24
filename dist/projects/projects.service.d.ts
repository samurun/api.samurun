import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Stack } from '../stacks/entities/stack.entity';
export declare class ProjectsService {
    private readonly projectRepository;
    private readonly stacksRepository;
    constructor(projectRepository: Repository<Project>, stacksRepository: Repository<Stack>);
    create(createProjectDto: CreateProjectDto): Promise<any>;
    getCount(): Promise<any>;
    findAll(): Promise<Project[]>;
    findOne(id: string): Promise<Project>;
    getRecentProjects(): Promise<Project[]>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<UpdateProjectDto>;
    remove(id: string): Promise<any>;
}
