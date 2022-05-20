import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { MasaService } from './masa.service';
import { CreateMasaDto } from './dto/create-masa.dto';
import { UpdateMasaDto } from './dto/update-masa.dto';
import { Masa } from './entities/masa.entity';
import { AdisyonService } from 'src/adisyon/adisyon.service';
import { Adisyon } from 'src/adisyon/entities/adisyon.entity';
import { QueryAdisyonDto } from 'src/adisyon/dto/query-adisyon.dto';
import { Siparis } from 'src/siparis/entities/siparis.entity';
import { SiparisService } from 'src/siparis/siparis.service';
import { UpdateSiparisDto } from 'src/siparis/dto/update-siparis.dto';
import { MasaQuery } from './dto/query-masa-dto';

@Controller('masa')
export class MasaController {
  constructor(
    private readonly masaService: MasaService,
    private readonly adisyonService: AdisyonService,
    private readonly siparisService: SiparisService
    ) {}

    createResponse(msg:string,description:string,status:number){
      throw new HttpException({msg,description},status);
  }

  @Post()
  create(@Body() createMasaDto: CreateMasaDto):Promise<Masa> {
    return this.masaService.create(createMasaDto);
  }

  @Get()
  findAll():Promise<Masa[]> {
    return this.masaService.findAll();
  }

  @Get('/name/:name')
  findName(@Param('name') name:string):Promise<Masa>{
    return this.masaService.findName(name);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.masaService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMasaDto: UpdateMasaDto) {
    const masa = await this.masaService.update(id, updateMasaDto);
    if(masa.affected === 0)
      this.createResponse('error','Masa Bulunamadı',HttpStatus.BAD_REQUEST);
    else
      this.createResponse('success','Masa Güncellendi',HttpStatus.OK);
  }

  @Delete(':id')
  async delete(@Param('id') id:number){
    const masa = await this.masaService.delete(id);
    if(masa.affected === 0)
      this.createResponse('error','Masa Bulunamadı',HttpStatus.BAD_REQUEST);
    else
      this.createResponse('success','Masa Silindi',HttpStatus.OK);
  }
  
  //-----------------------------------------------------------------------------------------------------------------------------
  //ADİSYON

  @Post(':id/adisyon')
  @HttpCode(HttpStatus.CREATED)
  createAdisyon(@Param('id') id:number):Promise<Adisyon>{
    return this.adisyonService.create(id); 
  }

  @Get(':id/adisyon')
  @HttpCode(HttpStatus.OK)
  findAdisyon(
    @Param('id') id:Number):Promise<Adisyon>{
      return this.adisyonService.findAdisyonByIdMasa(id);
  }

  //-------------------------------------------------------------------------------------------------------------------------------
  //SİPARİS

  @Post(':id/siparis')
  @HttpCode(HttpStatus.CREATED)
  createSiparis(@Param('id') id:number):Promise<Siparis>{
    return this.siparisService.create(id);
  }

  @Get(':id/siparis')
  @HttpCode(HttpStatus.OK)
  findSiparis(@Param('id') id:number):Promise<Siparis>{
    return this.siparisService.findSiparisByIdMasa(id);
  }

  @Put(':id/siparis')
  updateSiparis(@Param('id') id:number,@Body() updateSiparisDto:UpdateSiparisDto):Promise<Siparis>{
    return this.siparisService.update(id,updateSiparisDto);
  }

}
