import { Test, TestingModule } from '@nestjs/testing';
import { MasaController } from './masa.controller';
import { MasaService } from './masa.service';

describe('MasaController', () => {
  let controller: MasaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasaController],
      providers: [MasaService],
    }).compile();

    controller = module.get<MasaController>(MasaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
