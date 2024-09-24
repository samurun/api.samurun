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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(createUserDto.password, salt);
        try {
            const user = this.usersService.create({
                ...createUserDto,
                password: hashPassword,
            });
            await this.usersService.save(user);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('User already exists');
            }
        }
    }
    async getCount() {
        return this.usersService.count();
    }
    async findAll() {
        return this.usersService.find({
            select: [
                'id',
                'username',
                'full_name',
                'email',
                'created_at',
                'updated_at',
            ],
        });
    }
    async findOne(id) {
        const founded = await this.usersService.findOneBy({ id });
        if (!founded) {
            throw new common_1.NotFoundException();
        }
        return founded;
    }
    async findByUsername(username) {
        const founded = await this.usersService.findOneBy({ username });
        if (!founded) {
            throw new common_1.NotFoundException();
        }
        return founded;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map