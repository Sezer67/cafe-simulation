import { Test, TestingModule } from '@nestjs/testing';
import { MasaService } from './masa.service';

describe('MasaService', () => {
  let service: MasaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasaService],
    }).compile();

    service = module.get<MasaService>(MasaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
