import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { AdisyonModule } from './adisyon/adisyon.module';
import { MasaModule } from './masa/masa.module';
import { SiparisModule } from './siparis/siparis.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.DB_HOST,
      port:parseInt(<string>process.env.DB_PORT),
      username:process.env.DB_USER,
      password:process.env.DB_PASS,
      database:process.env.DB_NAME,
      autoLoadEntities:true,
      synchronize:true,
      logging:true,
    }),
    ProductsModule,
    CategoryModule,
    AdisyonModule,
    MasaModule,
    SiparisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
