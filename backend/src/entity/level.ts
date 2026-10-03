import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Topic } from "./topic.js";

@Entity()
export class Level {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  levelName: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "int" })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Topic, (topic) => topic.levels, {
    onDelete: "CASCADE",
  })
  topic: Topic;
}
