import "reflect-metadata";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category.js";
@Entity()
export class Fields {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type:"varchar",unique:true})
  fieldName: string;

  @Column({type:"varchar"})
  description:string
  
  
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(()=>Category,category=>category.field)
  categories:Category[];
}
