import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class UpdateMasaDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    kisiSayisi?:Number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(1)
    dolu?:Number;

    @IsString()
    masaAdi?:string;

    @IsNotEmpty()
    @IsString()
    adisyonId?:string;

    @IsNotEmpty()
    @IsString()
    siparisId?:string;
}
