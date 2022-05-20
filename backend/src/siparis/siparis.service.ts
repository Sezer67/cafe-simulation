import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateMasaDto } from 'src/masa/dto/update-masa.dto';
import { Masa } from 'src/masa/entities/masa.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateSiparisDto } from './dto/create-siparis.dto';
import { UpdateSiparisDto } from './dto/update-siparis.dto';
import { Siparis } from './entities/siparis.entity';

@Injectable()
export class SiparisService {

  constructor(
    @InjectRepository(Siparis)
    private readonly siparisRepo:Repository<Siparis>,
    @InjectRepository(Masa)
    private readonly masaRepo:Repository<Masa>
    ){}

  createResponse(msg:string,description:string,status:number){
    throw new HttpException({msg,description},status);
  }

  async create(id:number):Promise<Siparis>{
    var masa:Masa;
    await this.findByIDMasa(id).then(res=>{
      masa = res;
    }).catch((error)=>{
      this.createResponse('Exception',error,HttpStatus.INTERNAL_SERVER_ERROR);
    });
    //masa yı da doldur
    var updateMasaDto = new UpdateMasaDto();
    updateMasaDto.dolu=1;
    const update = await this.masaRepo.update(id,updateMasaDto);
    const siparis = await this.siparisRepo.create({masa}).save();
    console.log(siparis);
    return siparis;
  }

  async findSiparisByIdMasa(id:number):Promise<Siparis>{
    var masa = await this.findByIDMasa(id);
    if(!masa.siparisler){
      console.log(masa);
      this.createResponse('Not Found','Bu masanın henüz bir siparişi yok',HttpStatus.NOT_FOUND);
    }

    return await this.siparisRepo.findOne({
      where:{
        masano:id
      }
    });
  }

  async findAll():Promise<Siparis[]>{
    const siparisler = await this.siparisRepo.find({
      relations:['masa']
    });
    if(siparisler.length < 1)
      this.createResponse('Not Found','Aktif Bir Sipariş Bulunmamaktadır.',404);
    return siparisler;
  }

  async update(id:number,updateSiparisDto:UpdateSiparisDto):Promise<Siparis>{
    // o masanın sipariş ürünleri bulunacak. yeni ürünlere eklenecek
    console.log(updateSiparisDto);
    var masa = await this.findByIDMasa(id);
    console.log(masa);
    if(!masa.siparisler){
      this.createResponse('Not Found','Bu masanın henüz bir siparişi yok',HttpStatus.NOT_FOUND);
    }
      
    if(masa.siparisler.urunler)
      updateSiparisDto.urunler = masa.siparisler.urunler.concat(updateSiparisDto.urunler);
    
    return await this.siparisRepo.create({
      masa,
      id:masa.siparisler.id,
      ...updateSiparisDto
    }).save();
  }

  async findByIDMasa(masaId:Number):Promise<Masa>{
    var masa:Masa;
    await this.masaRepo.findOne({
      where:{
        id:masaId
      },relations:['siparisler']
    }).then((res)=>{
      masa = res;
    }).catch((error)=>{
      this.createResponse('Exception',error,HttpStatus.INTERNAL_SERVER_ERROR);
    });
    if(!masa)
      this.createResponse('Not Found','Böyle bir masa bulunamadı.',HttpStatus.NOT_FOUND);
    return masa;
  }

  //silinecek ürün id si gelecek ve onun dışında filtreleme yapıcaz
  async deleteProduct(siparisId:string,productId:string):Promise<Siparis>{
    const siparis = await this.siparisRepo.findOne({
      where:{
        id:siparisId
      }
    });
    //ilk bulduğunun index ini döndürsün sonra o indexten 1 adet splice yap
    let deletedIndex:number = -1;
    console.log(productId);
    siparis.urunler.forEach((urun,index)=>{
      if(deletedIndex === -1){
        if(urun === productId){
          deletedIndex = index;
        }
      }
    });
    siparis.urunler.splice(deletedIndex,1);
    return siparis.save();
  }

  async delete(id:string):Promise<string>{
    await this.siparisRepo.delete(id);
    return id;
  }
}
