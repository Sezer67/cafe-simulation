import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { Product } from "./entities/product.entity";
import { ProductsService } from "./products.service";

@Controller('product')
export class ProductController{
    constructor(private readonly productService:ProductsService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll():Promise<Product[]>{
        return this.productService.findAll();
    }
    //ürün id lerini alabilmem için isteğin post olması gerekti
    @Post()
    @HttpCode(HttpStatus.OK)
    findByIds(@Body() productIds:Array<string>):Promise<Product[]>{
        return this.productService.findByIds(productIds);
    }

}