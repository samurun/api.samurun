import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

describe('UploadController', () => {
  let controller: UploadController;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [
        UploadService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn((key: string) => {
              // this is being super extra, in the case that you need multiple keys with the `get` method
              if (key === 'AWS_REGION_S3') {
                return 123;
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UploadController>(UploadController);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    jest.spyOn(configService, 'getOrThrow').mockReturnValue(123);
    expect(controller).toBeDefined();
  });

  describe('UploadController', () => {
    let controller: UploadController;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [UploadController],
        providers: [
          {
            provide: UploadService,
            useValue: {
              uploadImage: jest.fn(),
            },
          },
        ],
      }).compile();

      controller = module.get<UploadController>(UploadController);
    });

    it('should upload a file and return the URL', async () => {
      const mockFile: Express.Multer.File = {
        originalname: 'test.jpg',
        buffer: Buffer.from('test file content'),
        mimetype: 'image/jpeg',
        size: 123456,
        fieldname: '',
        encoding: '',
        stream: new Readable(),
        destination: '',
        filename: '',
        path: '',
      };

      const expectedUrl =
        'https://mock-bucket.s3.mock-region.amazonaws.com/test.jpg';

      // Mock the uploadImage method to return the expected URL
      jest
        .spyOn(controller, 'uploadFile')
        .mockResolvedValue({ url: expectedUrl });

      const result = await controller.uploadFile(mockFile);

      expect(controller.uploadFile).toHaveBeenCalledTimes(1);

      expect(result).toEqual({ url: expectedUrl });
    });
  });
});
