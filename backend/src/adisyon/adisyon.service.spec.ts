import { Test, TestingModule } from '@nestjs/testing';
import { AdisyonService } from './adisyon.service';

describe('AdisyonService', () => {
  let service: AdisyonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdisyonService],
    }).compile();

    service = module.get<AdisyonService>(AdisyonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
