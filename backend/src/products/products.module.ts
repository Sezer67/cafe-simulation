import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CategoryModule } from 'src/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';

@Module({
  imports:[
    forwardRef(()=>CategoryModule),
    TypeOrmModule.forFeature([Category,Product])
  ],
  controllers: [ProductController],
  providers: [ProductsService],
  exports:[ProductsService]
})
export class ProductsModule {}
