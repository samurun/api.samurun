import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DashboardDto } from './dto/dashboatd.dto';

describe('DashboardController', () => {
  let controller: DashboardController;
  let dashboardService: DashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        {
          provide: DashboardService,
          useValue: {
            getDashboard: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
    dashboardService = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return dashboard data', async () => {
    const mockDashboardData: DashboardDto = {
      project: 5,
      user: 10,
      stack: 3,
      recent_projects: [
        {
          id: '1',
          title: 'Project 1',
          image_cover: '',
          description: '',
          url: '',
          created_at: undefined,
          updated_at: undefined,
          stacks: [],
        },
      ],
      stacks: [{ id: 1, name: 'Stack 1', projectCount: 2 }],
    };

    // Mocking the return value of the dashboardService.getDashboard method
    jest
      .spyOn(dashboardService, 'getDashboard')
      .mockResolvedValue(mockDashboardData);

    const result = await controller.getDashboard();

    expect(result).toEqual(mockDashboardData);
  });
});
