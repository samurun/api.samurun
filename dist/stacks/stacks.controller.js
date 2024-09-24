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
exports.StacksController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const stacks_service_1 = require("./stacks.service");
const create_stack_dto_1 = require("./dto/create-stack.dto");
const update_stack_dto_1 = require("./dto/update-stack.dto");
const swagger_1 = require("@nestjs/swagger");
let StacksController = class StacksController {
    constructor(stacksService) {
        this.stacksService = stacksService;
    }
    create(createStackDto) {
        return this.stacksService.create(createStackDto);
    }
    findAll() {
        return this.stacksService.findAll();
    }
    findOne(id) {
        return this.stacksService.findOne(id);
    }
    update(id, updateStackDto) {
        return this.stacksService.update(id, updateStackDto);
    }
    remove(id) {
        return this.stacksService.remove(id);
    }
};
exports.StacksController = StacksController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/stack.entity").Stack }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stack_dto_1.CreateStackDto]),
    __metadata("design:returntype", void 0)
], StacksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/stack.entity").Stack] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StacksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/stack.entity").Stack }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StacksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/stack.entity").Stack }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_stack_dto_1.UpdateStackDto]),
    __metadata("design:returntype", void 0)
], StacksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/stack.entity").Stack }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StacksController.prototype, "remove", null);
exports.StacksController = StacksController = __decorate([
    (0, swagger_1.ApiTags)('Stacks'),
    (0, common_1.Controller)('stacks'),
    __metadata("design:paramtypes", [stacks_service_1.StacksService])
], StacksController);
//# sourceMappingURL=stacks.controller.js.map