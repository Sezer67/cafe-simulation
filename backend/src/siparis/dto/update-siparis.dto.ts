import { IsArray, IsNotEmpty } from "class-validator";

export class UpdateSiparisDto {
    @IsNotEmpty()
    @IsArray()
    urunler:string[];
}
