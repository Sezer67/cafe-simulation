import { Test, TestingModule } from '@nestjs/testing';
import { AdisyonController } from './adisyon.controller';
import { AdisyonService } from './adisyon.service';

describe('AdisyonController', () => {
  let controller: AdisyonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdisyonController],
      providers: [AdisyonService],
    }).compile();

    controller = module.get<AdisyonController>(AdisyonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
