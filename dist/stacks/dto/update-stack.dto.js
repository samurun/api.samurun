"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStackDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_stack_dto_1 = require("./create-stack.dto");
class UpdateStackDto extends (0, swagger_1.PartialType)(create_stack_dto_1.CreateStackDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateStackDto = UpdateStackDto;
//# sourceMappingURL=update-stack.dto.js.map