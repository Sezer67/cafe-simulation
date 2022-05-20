import { Test, TestingModule } from '@nestjs/testing';
import { SiparisService } from './siparis.service';

describe('SiparisService', () => {
  let service: SiparisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiparisService],
    }).compile();

    service = module.get<SiparisService>(SiparisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
