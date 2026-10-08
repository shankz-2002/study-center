import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";

import { Category } from "./category.js";
import { Level } from "./level.js";
import { UserTopicCompletion } from "./userTopicCompletion.js";

@Entity()
export class Topic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  topicName: string;

  @Column({ type: "varchar" })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category.topics, {
    onDelete: "CASCADE",
  })
  category: Relation<Category>;
  @OneToMany(() => Level, (level) => level.topic)
  levels: Level[];

  @OneToMany(() => UserTopicCompletion, (completion) => completion.topic)
  completions: UserTopicCompletion[];
}
