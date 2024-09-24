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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./entities/project.entity");
const typeorm_2 = require("@nestjs/typeorm");
const stack_entity_1 = require("../stacks/entities/stack.entity");
let ProjectsService = class ProjectsService {
    constructor(projectRepository, stacksRepository) {
        this.projectRepository = projectRepository;
        this.stacksRepository = stacksRepository;
    }
    async create(createProjectDto) {
        const stacks = await this.stacksRepository.findBy({
            id: (0, typeorm_1.In)(createProjectDto.stackIds),
        });
        const project = this.projectRepository.create({
            ...createProjectDto,
            stacks,
        });
        return this.projectRepository.save(project);
    }
    getCount() {
        return this.projectRepository.count();
    }
    findAll() {
        return this.projectRepository.find({ relations: ['stacks'] });
    }
    async findOne(id) {
        const founded = await this.projectRepository.findOne({
            where: { id },
            relations: ['stacks'],
        });
        if (!founded) {
            throw new common_1.NotFoundException();
        }
        return founded;
    }
    async getRecentProjects() {
        const projects = await this.projectRepository.find({
            order: {
                created_at: 'DESC',
            },
            relations: ['stacks'],
            take: 5,
        });
        return projects;
    }
    async update(id, updateProjectDto) {
        const { stackIds } = updateProjectDto;
        await this.findOne(id);
        const updated = await this.projectRepository.save({
            id: id,
            ...updateProjectDto,
        });
        if (updateProjectDto.stackIds) {
            const stacks = await this.stacksRepository.findBy({
                id: (0, typeorm_1.In)(stackIds),
            });
            updated.stacks = stacks;
        }
        return this.projectRepository.save(updated);
    }
    async remove(id) {
        const founded = await this.findOne(id);
        return this.projectRepository.remove(founded);
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_2.InjectRepository)(stack_entity_1.Stack)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map