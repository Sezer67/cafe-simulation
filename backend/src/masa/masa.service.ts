import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateMasaDto } from './dto/create-masa.dto';
import { UpdateMasaDto } from './dto/update-masa.dto';
import { Masa } from './entities/masa.entity';

import { TypeORMError } from 'typeorm';
import { Adisyon } from 'src/adisyon/entities/adisyon.entity';
import { MasaQuery } from './dto/query-masa-dto';
@Injectable()
export class MasaService {

  constructor(
    @InjectRepository(Masa)
    private readonly masaRepo:Repository<Masa>
  ){}

  createResponse(msg:string,description:string,status:number){
    throw new HttpException({msg,description},status);
  }

  async create(createMasaDto: CreateMasaDto):Promise<Masa> {
    try {
      createMasaDto.masaAdi = createMasaDto.masaAdi.toUpperCase();
      const masa = this.masaRepo.create(createMasaDto);
      return await masa.save();
    } catch (error) {
      console.log(error.detail.search("zaten mevcut"))
      if(error.detail.search("zaten mevcut") !== -1)
        this.createResponse('Bad Request',error.detail,HttpStatus.BAD_REQUEST);
      else
        this.createResponse('Bad Request','kisiSayisi ve/veya masaAdi parametreleri eksik',HttpStatus.BAD_REQUEST);
      }

  }

  async findAll():Promise<Masa[]> {
    const masalar = await this.masaRepo.find({
      order:{
        masaAdi:'ASC'
      }
    });
    if(masalar.length < 1){
      this.createResponse('Not Found','Henüz Eklenmiş Bir Masa Yok',HttpStatus.NOT_FOUND);
    }
    return masalar;
  }

  findName(name: string) {
    name = name.toUpperCase();
    return this.masaRepo.findOne({
      where:{
        masaAdi:name
      },
      relations:['adisyon','siparisler']
    });
  }

  findOne(id: number) {
    return this.masaRepo.findOne({
      where:{
        id:id
      },
      relations:['adisyon','siparisler']
    });
  }

  async update(id: number, updateMasaDto: UpdateMasaDto):Promise<UpdateResult> {
    const masa = this.masaRepo.findOne({
      where:{
        id
      }
    });
    if(!masa)
      this.createResponse('Not Found','Böyle bir masa bulunamadı.',HttpStatus.NOT_FOUND);
    else
      return await this.masaRepo.update(id,updateMasaDto);
  }

  async delete(id:number):Promise<DeleteResult>{
    return await this.masaRepo.delete(id);
  }


}
