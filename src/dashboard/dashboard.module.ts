import { UsersModule } from 'src/users/users.module';
import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ProjectsModule } from 'src/projects/projects.module';
import { StacksModule } from '../stacks/stacks.module';

@Module({
  imports: [UsersModule, ProjectsModule, StacksModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
