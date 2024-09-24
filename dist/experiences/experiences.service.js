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
exports.ExperiencesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const experience_entity_1 = require("./entities/experience.entity");
const typeorm_2 = require("typeorm");
let ExperiencesService = class ExperiencesService {
    constructor(experiencesRepository) {
        this.experiencesRepository = experiencesRepository;
    }
    async create(createExperienceDto) {
        const experience = this.experiencesRepository.create(createExperienceDto);
        return await this.experiencesRepository.save(experience);
    }
    async findAll() {
        return await this.experiencesRepository.find({
            order: {
                start_date: 'DESC',
            },
        });
    }
    async findOne(id) {
        const found = await this.experiencesRepository.findOneBy({ id });
        if (!found) {
            throw new common_1.NotFoundException();
        }
        return found;
    }
    async update(id, updateExperienceDto) {
        await this.findOne(id);
        const update = await this.experiencesRepository.save({
            id: id,
            ...updateExperienceDto,
        });
        await this.experiencesRepository.update(id, update);
        return update;
    }
    async remove(id) {
        const found = await this.findOne(id);
        return await this.experiencesRepository.remove(found);
    }
};
exports.ExperiencesService = ExperiencesService;
exports.ExperiencesService = ExperiencesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(experience_entity_1.Experience)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExperiencesService);
//# sourceMappingURL=experiences.service.js.map