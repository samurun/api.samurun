import { ConfigService } from '@nestjs/config';
export declare class UploadService {
    private readonly configService;
    private readonly S3;
    constructor(configService: ConfigService);
    uploadImage(filename: string, file: Buffer): Promise<string>;
}
