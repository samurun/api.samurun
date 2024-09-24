import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from './upload.service';
import { ConfigService } from '@nestjs/config';
import { S3 } from '@aws-sdk/client-s3';
// import { UploadController } from './upload.controller';
// import { Readable } from 'stream';

jest.mock('@aws-sdk/client-s3'); // Mock the S3 module

describe('UploadService', () => {
  let service: UploadService;
  // let configService: ConfigService;
  let mockS3Send: jest.Mock; // Store mock send method

  beforeEach(async () => {
    // Create mock for S3.send method
    mockS3Send = jest.fn(); // Initialize the mock function

    // Override S3 prototype to use the mocked send method
    S3.prototype.send = mockS3Send;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn((key: string) => {
              switch (key) {
                case 'AWS_BUCKET_NAME':
                  return 'mock-bucket';
                case 'AWS_REGION_S3':
                  return 'mock-region';
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UploadService>(UploadService);
    // configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    // jest.spyOn(configService, 'getOrThrow').mockReturnValue(123);
    expect(service).toBeDefined();
  });

  it('should upload an image and return the URL', async () => {
    const mockFilename = 'test.jpg';
    const mockFile = Buffer.from('test file');

    // Mock S3 send method to resolve successfully
    mockS3Send.mockResolvedValue({});

    const result = await service.uploadImage(mockFilename, mockFile);

    expect(mockS3Send).toHaveBeenCalled();

    expect(result).toBe(
      `https://mock-bucket.s3.mock-region.amazonaws.com/${mockFilename}`,
    );
  });

  it('should return an error when S3 upload fails', async () => {
    const mockFilename = 'test.jpg';
    const mockFile = Buffer.from('test file');

    // Mock an error being thrown by the S3 client
    mockS3Send.mockRejectedValue(new Error('S3 upload failed')); // Mock rejection

    // Check if the uploadImage method throws the expected error
    await expect(service.uploadImage(mockFilename, mockFile)).rejects.toThrow(
      'S3 upload failed',
    );
  });
});
