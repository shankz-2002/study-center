import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

import { User } from "./user.js";
import { Topic } from "./topic.js";

@Entity()
@Unique(["user", "topic"])
export class UserTopicCompletion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Topic, {
    onDelete: "CASCADE",
  })
  topic: Topic;

  @Column({ type: "int" })
  totalScore: number;

  @Column({ type: "int" })
  totalPossibleScore: number;

  @Column({ type: "float" })
  percentage: number;

  @Column({ type: "int" })
  totalLevels: number;

  @Column({ type: "int" })
  completedLevels: number;

  @CreateDateColumn()
  completedAt: Date;
}
