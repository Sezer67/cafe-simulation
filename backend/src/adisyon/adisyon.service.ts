import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {format} from 'date-fns';
import { Masa } from 'src/masa/entities/masa.entity';
import { ProductsService } from 'src/products/products.service';
import { Between, Repository } from 'typeorm';
import { QueryAdisyonDto } from './dto/query-adisyon.dto';
import { UpdateAdisyonDto } from './dto/update-adisyon.dto';
import { Adisyon } from './entities/adisyon.entity';

@Injectable()
export class AdisyonService {
  constructor(
    @InjectRepository(Adisyon)
    private readonly adisyonRepo: Repository<Adisyon>,
    @InjectRepository(Masa)
    private readonly masaRepo: Repository<Masa>,
    private readonly productService: ProductsService,
  ) {}

  createResponse(msg: string, description: string, status: number) {
    throw new HttpException({ msg, description }, status);
  }

  async create(masaId: number): Promise<Adisyon> {
    var masa: Masa;
    await this.masaRepo
      .findOne({ id: masaId })
      .then((res) => {
        masa = res;
      })
      .catch((error) => {
        this.createResponse(
          'Exception',
          error,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
    if (!masa)
      this.createResponse(
        'Not Found',
        'Böyle bir masa bulunamadı.',
        HttpStatus.NOT_FOUND,
      );
    const adisyon = await this.adisyonRepo.create({ masa }).save();
    console.log(adisyon);
    return adisyon;
  }

  //eğer query gelirse tarih ve aktifliğe göre getirir
  async findAll(queryAdisyonDto: QueryAdisyonDto): Promise<Adisyon[]> {
    const { aktif, tarih } = queryAdisyonDto;
    // Object.keys(queryAdisyonDto).forEach((key)=>{
    //   queryAdisyonDto[key] = ILike(`%${queryAdisyonDto[key]}%`);
    //   console.log(queryAdisyonDto[key]);
    // });

    return await this.adisyonRepo.find({
      relations: ['masa'],
      order: {
        tarih: 'DESC',
      },
    });
  }

  async findAdisyonByIdMasa(id: Number): Promise<Adisyon> {
    var masa = await this.findByIDMasa(id);
    console.log(masa);
    if (!masa.adisyon) {
      this.createResponse(
        'Not Found',
        `${masa.masaAdi} masasının adisyonu bulunmamaktadır`,
        HttpStatus.NOT_FOUND,
      );
    }
    const adisyon = await this.adisyonRepo.findOne({
      where: {
        id: masa.adisyon.id,
      },
    });

    return adisyon;
  }

  async updateAdisyon(
    id: string,
    updateAdisyonDto: UpdateAdisyonDto,
  ): Promise<Adisyon> {
    //eğer urunler güncelleniyorsa gelen ürünün id sinden ürünü bul fiyatını çek ve fiyatı da güncelle
    var adisyon: Adisyon;
    if (updateAdisyonDto.urunler) {
      var urun = updateAdisyonDto.urunler;
      await this.adisyonRepo
        .findOne({
          where: {
            id,
          },
        })
        .then(async (res) => {
          if (res.urunler)
            updateAdisyonDto.urunler = res.urunler.concat(
              updateAdisyonDto.urunler,
            );
          this.productService
            .findByIds(urun)
            .then(async (product) => {
              updateAdisyonDto.ucret = res.ucret + product[0].price;

              adisyon = await this.adisyonRepo
                .create({
                  id,
                  urunler: updateAdisyonDto.urunler,
                  ucret: updateAdisyonDto.ucret,
                  masaAdi: updateAdisyonDto.masaAdi
                })
                .save();
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else {
      //aktifliği değişiyor
      adisyon = await this.adisyonRepo
        .create({
          id,
          ...updateAdisyonDto,
        })
        .save();
    }

    return adisyon;
  }

  async findBetweenDate(
    queryAdisyonDto: QueryAdisyonDto,
  ): Promise<[Adisyon[], number]> {
    //return [ [],count]
    return await this.adisyonRepo.findAndCount({
      where: {
        tarih: Between(queryAdisyonDto.startDate, queryAdisyonDto.endDate),
      },
    });
  }

  async findByIDMasa(masaId: Number): Promise<Masa> {
    var masa: Masa;
    await this.masaRepo
      .findOne({
        where: {
          id: masaId,
        },
        relations: ['adisyon'],
      })
      .then((res) => {
        masa = res;
      })
      .catch((error) => {
        this.createResponse(
          'Exception',
          error,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
    if (!masa)
      this.createResponse(
        'Not Found',
        'Böyle bir masa bulunamadı.',
        HttpStatus.NOT_FOUND,
      );

    return masa;
  }
}
