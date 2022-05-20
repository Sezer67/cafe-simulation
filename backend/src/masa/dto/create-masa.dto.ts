import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateMasaDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    kisiSayisi:Number;

    @IsNotEmpty()
    @IsString()
    masaAdi:string;
}
