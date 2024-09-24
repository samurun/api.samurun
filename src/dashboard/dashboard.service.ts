import { Injectable } from '@nestjs/common';

import { ProjectsService } from '../projects/projects.service';
import { UsersService } from '../users/users.service';
import { DashboardDto } from './dto/dashboatd.dto';
import { StacksService } from '../stacks/stacks.service';

@Injectable()
export class DashboardService {
  constructor(
    private projectsService: ProjectsService,
    private usersService: UsersService,
    private stacksService: StacksService,
  ) {}

  async getDashboard(): Promise<DashboardDto> {
    const projectCount = await this.projectsService.getCount();
    const userCount = await this.usersService.getCount();
    const stackCount = await this.stacksService.getCount();

    const recentProjects = await this.projectsService.getRecentProjects();

    const stacksProjectCounts =
      await this.stacksService.findWithProjectCounts();

    return {
      project: projectCount,
      user: userCount,
      stack: stackCount,
      recent_projects: recentProjects,
      stacks: stacksProjectCounts,
    };
  }
}
