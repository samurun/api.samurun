import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // This tells Swagger that the input is a file
        },
        filename: {
          type: 'string',
        },
      },
    },
  })
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }), // Limit file size to 1MB
          new FileTypeValidator({ fileType: /(image\/jpeg|image\/png)$/ }), // Allow JPEG and PNG images
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<{ url: string }> {
    const imageUrl = await this.uploadService.uploadImage(
      file.originalname,
      file.buffer,
    );
    return { url: imageUrl };
  }
}
