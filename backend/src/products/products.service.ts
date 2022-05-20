import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQuery } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Category) 
    private readonly categoryRepo:Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepo:Repository<Product>
  ){}

  createResponse(msg:string,description:string,status:number){
    throw new HttpException({msg,description},status);
}


  async create(id:string,createProductDto:CreateProductDto):Promise<Product>{
      //önce kategoriyi bul ve ona ekle
      const category = await this.categoryRepo.findOne(id);
      if(!category){
          this.createResponse('Not Found','Girdiğiniz ID ile eşleşen bir kategori bulunamadı.',HttpStatus.NOT_FOUND);
      }
      return await this.productRepo.create({
          ...createProductDto,
          category
      }).save();
  }

  async findByIds(productIds:Array<string>):Promise<Product[]>{
      return this.productRepo.findByIds(productIds);
  }

  async findAll():Promise<Product[]>{
      return await this.productRepo.find({
          relations:['category']
      });
  }

  async findAllByCategoryId(id:string,productQuery:ProductQuery):Promise<Product[]>{
    Object.keys(productQuery).forEach((key)=> {
        productQuery[key] = ILike(`%${productQuery[key]}%`);
    });

    return await this.productRepo.find({
        where: {categoryId:id, ...productQuery},
        order: {
            name:'ASC',
        },
        relations:['category']
    });
  }

  async update(categoryId:string,productId:string,updateProductDto:UpdateProductDto):Promise<Product>{
    const product = await this.findByCategoryIdAndProductId(categoryId,productId);
    if(!product)
        this.createResponse('Not Found','Girdiğiniz ID ile eşleşen bir kategori / ürün bulunamadı.',HttpStatus.NOT_FOUND);

    return await this.productRepo.create({
        id:productId,
        ...updateProductDto
    }).save();

  }

  async delete(categoryId:string,productId:string):Promise<Object>{
      const product = await this.findByCategoryIdAndProductId(categoryId,productId);
      if(!product)
          this.createResponse('Not Found','Girdiğiniz ID ile eşleşen bir kategori / ürün bulunamadı.',HttpStatus.NOT_FOUND);
      await this.productRepo.delete(productId);
      const response = {deletedId:productId,deletedName:product.name}
      return response;
  }

  async findByCategoryIdAndProductId(categoryId:string,productId:string):Promise<Product>{
    const product = await this.productRepo.findOne({
        where:{
            categoryId,
            id:productId
        }
    });
    return product;
  }




}
