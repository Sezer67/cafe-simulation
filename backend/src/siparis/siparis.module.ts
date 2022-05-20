import { forwardRef, Module } from '@nestjs/common';
import { SiparisService } from './siparis.service';
import { SiparisController } from './siparis.controller';
import { ProductsModule } from 'src/products/products.module';
import { MasaModule } from 'src/masa/masa.module';
import { Masa } from 'src/masa/entities/masa.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Siparis } from './entities/siparis.entity';

@Module({
  imports:[
    forwardRef(()=>ProductsModule),
    TypeOrmModule.forFeature([Product,Masa,Siparis])
  ],
  controllers: [SiparisController],
  providers: [SiparisService],
  exports: [SiparisService]
})
export class SiparisModule {}
