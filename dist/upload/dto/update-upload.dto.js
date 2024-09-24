"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUploadDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_upload_dto_1 = require("./create-upload.dto");
class UpdateUploadDto extends (0, swagger_1.PartialType)(create_upload_dto_1.CreateUploadDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateUploadDto = UpdateUploadDto;
//# sourceMappingURL=update-upload.dto.js.map