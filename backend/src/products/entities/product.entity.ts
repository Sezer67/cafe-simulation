import { Adisyon } from "src/adisyon/entities/adisyon.entity";
import { Category } from "src/category/entities/category.entity";
import { Siparis } from "src/siparis/entities/siparis.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    @Column({default:0})
    price:number;

    @Column({nullable:true})
    description?:string;

    @Column()
    imgUrl:string;

    @UpdateDateColumn({type:'timestamptz', onUpdate:'NOW()' ,nullable:true})
    updatedAt:Date;

    @Column({select:false,nullable:false})
    categoryId:string;

    @ManyToOne(()=>Category,(category)=>category.products,{ onDelete:'CASCADE'})
    @JoinColumn({name:'categoryId'})
    category:Category;


    // @ManyToMany(()=>Adisyon)
    // adisyonlar:Adisyon[];
}   
