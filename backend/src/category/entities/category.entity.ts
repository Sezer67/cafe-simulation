import { Product } from "src/products/entities/product.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({nullable:false})
    name:string;

    @OneToMany(()=> Product, (product)=>product.category)
    products:Product[]
}
