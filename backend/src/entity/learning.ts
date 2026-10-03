import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Level } from "./level.js";

@Entity()
@Unique(["level", "order"])
export class Learning {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "int" })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Level, (level) => level.learning, {
    onDelete: "CASCADE",
  })
  level: Level;
}
