import { Masa } from "src/masa/entities/masa.entity";
import { Product } from "src/products/entities/product.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Adisyon extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;
 
    @Column({nullable:true})
    ucret:number;

    @Column({type:"int",default:1})
    aktif:Number; //1 ödenmedi 0 ödendi

    @UpdateDateColumn({type:'date', onUpdate:'NOW()' ,nullable:true})
    tarih:string;

    @Column({nullable:true,type:'varchar'})
    masaAdi:string;
    // @ManyToMany(()=>Product)
    // @JoinTable()
    // urunler:Product[];
    @Column("simple-array",{nullable:true})
    urunler:string[];

    @OneToOne(()=>Masa,(masa)=>masa.adisyon,{onDelete:'SET NULL'})
    masa:Masa;

}
