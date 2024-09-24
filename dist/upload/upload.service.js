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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@nestjs/config");
let UploadService = class UploadService {
    constructor(configService) {
        this.configService = configService;
        this.S3 = new client_s3_1.S3({
            region: this.configService.getOrThrow('AWS_REGION_S3'),
        });
    }
    async uploadImage(filename, file) {
        const bucketName = this.configService.getOrThrow('AWS_BUCKET_NAME');
        const region = this.configService.getOrThrow('AWS_REGION_S3');
        const key = filename;
        try {
            await this.S3.send(new client_s3_1.PutObjectCommand({
                Bucket: this.configService.getOrThrow('AWS_BUCKET_NAME'),
                Key: filename,
                Body: file,
            }));
            return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
        }
        catch (error) {
            throw new Error(`S3 upload failed: ${error.message}`);
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
//# sourceMappingURL=upload.service.js.map