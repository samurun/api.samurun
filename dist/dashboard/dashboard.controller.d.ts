import { DashboardService } from './dashboard.service';
import { DashboardDto } from './dto/dashboatd.dto';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboard(): Promise<DashboardDto>;
}
