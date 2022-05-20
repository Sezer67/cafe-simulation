import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) 
    private readonly categoryRepo:Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepo:Repository<Product>
  ){}
  
  async create(createCategoryDto: CreateCategoryDto):Promise<Category> {
    return await this.categoryRepo.create({...createCategoryDto}).save();
  }

  async findAll():Promise<Category[]>{
    return await this.categoryRepo.find();
  }

  async findById(id:string):Promise<Category>{
    return await this.categoryRepo.findOne(id);
  }

}
