import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, isNumber, IsOptional, IsString, Max, Min } from "class-validator";
//@Transform(value => Number.isNaN(+value) ? 0 : +value)

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price:number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    imgUrl?:string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description?:string;

}
