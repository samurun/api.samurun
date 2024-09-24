"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const projects_service_1 = require("../projects/projects.service");
const users_service_1 = require("../users/users.service");
const stacks_service_1 = require("../stacks/stacks.service");
let DashboardService = class DashboardService {
    constructor(projectsService, usersService, stacksService) {
        this.projectsService = projectsService;
        this.usersService = usersService;
        this.stacksService = stacksService;
    }
    async getDashboard() {
        const projectCount = await this.projectsService.getCount();
        const userCount = await this.usersService.getCount();
        const stackCount = await this.stacksService.getCount();
        const recentProjects = await this.projectsService.getRecentProjects();
        const stacksProjectCounts = await this.stacksService.findWithProjectCounts();
        return {
            project: projectCount,
            user: userCount,
            stack: stackCount,
            recent_projects: recentProjects,
            stacks: stacksProjectCounts,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService,
        users_service_1.UsersService,
        stacks_service_1.StacksService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map