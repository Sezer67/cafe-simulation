import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { AdisyonService } from './adisyon.service';
import { QueryAdisyonDto } from './dto/query-adisyon.dto';
import { UpdateAdisyonDto } from './dto/update-adisyon.dto';
import { Adisyon } from './entities/adisyon.entity';

@Controller('adisyon')
export class AdisyonController {
  constructor(private readonly adisyonService: AdisyonService) {}

  @Get()
  async findAll(@Query() queryAdisyonDto: QueryAdisyonDto): Promise<Adisyon[]> {
    return await this.adisyonService.findAll(queryAdisyonDto);
  }
  //adisyona ürün ekle
  //aktifliği değişir ürün eklenir ucret yeniden hesaplanır ve değişir

  @Put(':id')
  async addUrunToAdisyon(
    @Param('id') id: string,
    @Body() updateAdisyonDto: UpdateAdisyonDto,
  ): Promise<Adisyon> {
    return await this.adisyonService.updateAdisyon(id, updateAdisyonDto);
  }

  //tarihe göre getirme
  @Get('/date')
  async findBetweenDate(
    @Query() queryAdisyonDto: QueryAdisyonDto,
  ): Promise<[Adisyon[],number]> {
    return await this.adisyonService.findBetweenDate(queryAdisyonDto);
  }
}
