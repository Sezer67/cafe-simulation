import { Adisyon } from "src/adisyon/entities/adisyon.entity";
import { Siparis } from "src/siparis/entities/siparis.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Masa extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:Number;

    @Column({type:'int'})
    kisiSayisi:Number;

    @Column({nullable:false,unique:true})
    masaAdi:string;

    @Column({default:0})
    dolu:Number; //1 ise dolu 0 ise boş

    @Column({nullable:true})
    siparisId:string;

    @OneToOne(()=>Siparis,(siparis)=>siparis.masa,{onDelete:'CASCADE'})
    @JoinColumn({name:'siparisId'})
    siparisler:Siparis;

    @Column({nullable:true})
    adisyonId:string;

    @OneToOne(()=>Adisyon,(adisyon)=>adisyon.masa,{onDelete:'SET NULL'})
    @JoinColumn({name:'adisyonId'})
    adisyon:Adisyon;
}
