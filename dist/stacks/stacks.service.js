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
exports.StacksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const stack_entity_1 = require("./entities/stack.entity");
const typeorm_2 = require("typeorm");
let StacksService = class StacksService {
    constructor(stacksRepository) {
        this.stacksRepository = stacksRepository;
    }
    async create(createStackDto) {
        try {
            const stack = this.stacksRepository.create(createStackDto);
            return await this.stacksRepository.save(stack);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException(`${createStackDto.name} already exists`);
            }
        }
    }
    getCount() {
        return this.stacksRepository.count();
    }
    findAll() {
        return this.stacksRepository.find();
    }
    async findWithProjectCounts() {
        try {
            const stacks = await this.stacksRepository
                .createQueryBuilder('stack')
                .leftJoin('stack.projects', 'project')
                .select(['stack.id', 'stack.name'])
                .addSelect('COUNT(project.id)', 'projectCount')
                .groupBy('stack.id')
                .addGroupBy('stack.name')
                .orderBy('COUNT(project.id)', 'DESC')
                .getRawMany();
            return stacks.map((stack) => ({
                id: stack.stack_id,
                name: stack.stack_name,
                projectCount: parseInt(stack.projectCount, 10),
            }));
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }
    async findOne(id) {
        const founded = await this.stacksRepository.findOneBy({ id });
        if (!founded) {
            throw new common_1.NotFoundException();
        }
        return founded;
    }
    async update(id, updateStackDto) {
        const found = await this.findOne(id);
        const update = await this.stacksRepository.save({
            ...found,
            name: updateStackDto.name,
        });
        await this.stacksRepository.update(id, update);
        return update;
    }
    async remove(id) {
        const found = await this.findOne(id);
        return await this.stacksRepository.remove(found);
    }
};
exports.StacksService = StacksService;
exports.StacksService = StacksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stack_entity_1.Stack)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StacksService);
//# sourceMappingURL=stacks.service.js.map