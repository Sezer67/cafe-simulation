import { forwardRef, Module } from '@nestjs/common';
import { AdisyonService } from './adisyon.service';
import { AdisyonController } from './adisyon.controller';
import { ProductsModule } from 'src/products/products.module';
import { MasaModule } from 'src/masa/masa.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Masa } from 'src/masa/entities/masa.entity';
import { Adisyon } from './entities/adisyon.entity';

@Module({
  imports:[
    forwardRef(()=>ProductsModule),
    TypeOrmModule.forFeature([Product,Masa,Adisyon])
  ],
  controllers: [AdisyonController],
  providers: [AdisyonService],
  exports: [AdisyonService]
})
export class AdisyonModule {}
