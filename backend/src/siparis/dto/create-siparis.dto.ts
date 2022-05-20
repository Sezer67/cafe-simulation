import { IsArray, IsNotEmpty } from "class-validator";

export class CreateSiparisDto {
    @IsNotEmpty()
    @IsArray()
    urunler:string[];
}
