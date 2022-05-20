import { Test, TestingModule } from '@nestjs/testing';
import { SiparisController } from './siparis.controller';
import { SiparisService } from './siparis.service';

describe('SiparisController', () => {
  let controller: SiparisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiparisController],
      providers: [SiparisService],
    }).compile();

    controller = module.get<SiparisController>(SiparisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
