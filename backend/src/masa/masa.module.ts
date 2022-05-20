import { forwardRef, Module } from '@nestjs/common';
import { MasaService } from './masa.service';
import { MasaController } from './masa.controller';
import { Siparis } from 'src/siparis/entities/siparis.entity';
import { Adisyon } from 'src/adisyon/entities/adisyon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiparisModule } from 'src/siparis/siparis.module';
import { AdisyonModule } from 'src/adisyon/adisyon.module';
import { Masa } from './entities/masa.entity';
import { TypeORMError } from 'typeorm';

@Module({
  imports:[
    forwardRef(()=>SiparisModule),
    forwardRef(()=>AdisyonModule),
    TypeOrmModule.forFeature([Siparis,Adisyon,Masa])
  ],
  controllers: [MasaController],
  providers: [MasaService],
  exports:[MasaService]
})
export class MasaModule {}
