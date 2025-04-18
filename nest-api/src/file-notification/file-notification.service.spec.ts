import { Test, TestingModule } from '@nestjs/testing';
import { FileNotificationService } from './file-notification.service';

describe('FileNotificationService', () => {
  let service: FileNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileNotificationService],
    }).compile();

    service = module.get<FileNotificationService>(FileNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
