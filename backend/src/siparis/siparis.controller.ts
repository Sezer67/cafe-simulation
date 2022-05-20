import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { SiparisService } from './siparis.service';
import { CreateSiparisDto } from './dto/create-siparis.dto';
import { UpdateSiparisDto } from './dto/update-siparis.dto';
import { Siparis } from './entities/siparis.entity';

@Controller('siparis')
export class SiparisController {
  constructor(private readonly siparisService: SiparisService) {}

  @Get()
  findAll():Promise<Siparis[]>{
    return this.siparisService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id:string){
    return await this.siparisService.delete(id);
  }

  @Delete(':id/:productId')
  deleteProduct(
    @Param('id') id:string,
    @Param('productId') productId:string
  ):Promise<Siparis>{
    
    return this.siparisService.deleteProduct(id,productId);
  }

}
