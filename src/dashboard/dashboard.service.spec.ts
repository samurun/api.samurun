import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { ProjectsService } from '../projects/projects.service';
import { UsersService } from '../users/users.service';
import { StacksService } from '../stacks/stacks.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let projectsService: ProjectsService;
  let usersService: UsersService;
  let stacksService: StacksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: ProjectsService,
          useValue: {
            getCount: jest.fn(),
            getRecentProjects: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            getCount: jest.fn(),
          },
        },
        {
          provide: StacksService,
          useValue: {
            getCount: jest.fn(),
            findWithProjectCounts: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    projectsService = module.get<ProjectsService>(ProjectsService);
    usersService = module.get<UsersService>(UsersService);
    stacksService = module.get<StacksService>(StacksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return dashboard data', async () => {
    // Mocking the return values of the services
    jest.spyOn(projectsService, 'getCount').mockResolvedValue(5);
    jest.spyOn(usersService, 'getCount').mockResolvedValue(10);
    jest.spyOn(stacksService, 'getCount').mockResolvedValue(3);
    jest.spyOn(projectsService, 'getRecentProjects').mockResolvedValue([
      {
        id: '1',
        title: '',
        image_cover: 'cover',
        description: '',
        url: '',
        created_at: new Date('2024-12-12'),
        updated_at: new Date('2024-12-12'),
        stacks: [],
      },
    ]);
    jest
      .spyOn(stacksService, 'findWithProjectCounts')
      .mockResolvedValue([{ id: 1, name: 'Stack 1', projectCount: 2 }]);

    const result = await service.getDashboard();

    expect(result).toEqual({
      project: 5,
      user: 10,
      stack: 3,
      recent_projects: [
        {
          id: '1',
          title: '',
          image_cover: 'cover',
          description: '',
          url: '',
          created_at: new Date('2024-12-12'),
          updated_at: new Date('2024-12-12'),
          stacks: [],
        },
      ],
      stacks: [{ id: 1, name: 'Stack 1', projectCount: 2 }],
    });
  });
});
