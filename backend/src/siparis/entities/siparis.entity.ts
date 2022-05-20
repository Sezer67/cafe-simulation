import { Masa } from "src/masa/entities/masa.entity";
import { Product } from "src/products/entities/product.entity";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Siparis extends BaseEntity {
    //controller i masa controller
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column("simple-array",{nullable:true})
    urunler:string[];

    @OneToOne(()=>Masa,(masa)=>masa.siparisler,{onDelete:'CASCADE'})
    masa:Masa;
}
