import { IsArray, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class UpdateAdisyonDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(1)
    aktif?:Number;

    @IsNotEmpty()
    @IsString()
    masaAdi?:string;

    @IsNotEmpty()
    @IsArray()
    urunler?:string[];

    @IsNumber()
    ucret?:number;
}
