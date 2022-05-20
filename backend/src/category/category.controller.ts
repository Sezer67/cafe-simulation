import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { ProductQuery } from 'src/products/dto/query-product.dto';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService:ProductsService //çağırabilmemin sebebi module de import etmiş olmam
    ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) //başarılı olduğunda çalışacak yanıt kodu
  async create(@Body() createCategoryDto:CreateCategoryDto):Promise<Category>{
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll():Promise<Category[]>{
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id:string):Promise<Category>{
    return await this.categoryService.findById(id);
  }
  //ÜRÜNLER
  // mevcut sorgular : 
  // ürün oluşturma
  // kategori id ye göre ürün listeleme (sorgulu) + tek bir ürün getirme özelliği de burda kullanılabilir
  // ürün update


  @Post(':id/product')
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @Param('id') id:string,
    @Body() createProductDto:CreateProductDto
  ):Promise<Product>{
    return await this.productService.create(id,createProductDto);
  }

  @Get(':id/product')
  @HttpCode(HttpStatus.OK)
  async allProductsByCategoryId(
    @Param('id') id:string,
    @Query() productQuery:ProductQuery
  ):Promise<Product[]>{
    return await this.productService.findAllByCategoryId(id,productQuery);
  }

  @Get(':id/product/:productId')
  @HttpCode(HttpStatus.OK)
  async getProduct(
    @Param('id') id:string,
    @Param('productId') productId:string
  ):Promise<Product>{
    return this.productService.findByCategoryIdAndProductId(id,productId);
  }

  //kategori id ye gerek yok
  @Put(':id/product/:productId')
  @HttpCode(HttpStatus.OK)
  async updateProduct(
    @Param('id') id:string,
    @Param('productId') productId:string,
    @Body() updateCategoryDto:UpdateCategoryDto
  ):Promise<Product>{
    return this.productService.update(id,productId,updateCategoryDto);
  }

  @Delete(':id/product/:productId')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(
    @Param('id') id:string,
    @Param('productId') productId:string,
  ):Promise<Object>{
    return await this.productService.delete(id,productId);
  }





  
}
