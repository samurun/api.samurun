import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly S3 = new S3({
    region: this.configService.getOrThrow('AWS_REGION_S3'),
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadImage(filename: string, file: Buffer): Promise<string> {
    const bucketName = this.configService.getOrThrow('AWS_BUCKET_NAME');
    const region = this.configService.getOrThrow('AWS_REGION_S3');
    const key = filename;

    try {
      await this.S3.send(
        new PutObjectCommand({
          Bucket: this.configService.getOrThrow('AWS_BUCKET_NAME'),
          Key: filename,
          Body: file,
        }),
      );

      // Generate the URL
      return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    } catch (error) {
      throw new Error(`S3 upload failed: ${error.message}`); // Throw error instead of returning it
    }
  }
}
