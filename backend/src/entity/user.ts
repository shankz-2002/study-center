import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import 'reflect-metadata'
@Entity()
export class User{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({type:'varchar'})
    name:string

    @Column({type:'varchar'})
    password:string

    @Column({unique:true,type:'varchar'})
    email:string
    
    @CreateDateColumn()
    createdAt:Date;

}