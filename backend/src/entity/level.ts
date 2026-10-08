
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";

import { Topic } from "./topic.js";
import { Learning } from "./learning.js";
import { Question } from "./question.js";

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
  topic: Relation<Topic>;

  @OneToMany(() => Learning, (learning) => learning.level)
  learning: Relation<Learning>[];

  @OneToMany(() => Question, (question) => question.level)
  questions: Relation<Question>[];
}
