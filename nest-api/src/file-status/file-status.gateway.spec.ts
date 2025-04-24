import { Test, TestingModule } from '@nestjs/testing';
import { FileStatusGateway } from './file-status.gateway';

describe('FileStatusGateway', () => {
  let gateway: FileStatusGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileStatusGateway],
    }).compile();

    gateway = module.get<FileStatusGateway>(FileStatusGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
