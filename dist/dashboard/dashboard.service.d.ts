import { ProjectsService } from '../projects/projects.service';
import { UsersService } from '../users/users.service';
import { DashboardDto } from './dto/dashboatd.dto';
import { StacksService } from '../stacks/stacks.service';
export declare class DashboardService {
    private projectsService;
    private usersService;
    private stacksService;
    constructor(projectsService: ProjectsService, usersService: UsersService, stacksService: StacksService);
    getDashboard(): Promise<DashboardDto>;
}
