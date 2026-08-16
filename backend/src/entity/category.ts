import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Fields } from "./fields.js";

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true })
  categoryName: string;

  @Column({type:"varchar"})
  description:string

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(()=>Fields,field=>field.categories)
  field:Fields

}
