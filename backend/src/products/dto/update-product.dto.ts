import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateProductDto {
    @IsOptional()   // boş olabilir
    @IsNotEmpty()   // değerin içi boş olmasın
    @IsString()     // string değer
    name?:string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description?:string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    imgUrl?:string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    price?:number;
}
