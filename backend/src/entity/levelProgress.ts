import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

import { User } from "./user.js";
import { Level } from "./level.js";

@Entity()
@Unique(["user", "level"])
export class UserLevelProgress {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Level, {
    onDelete: "CASCADE",
  })
  level: Level;

  @Column({ type: "int" })
  score: number;

  @Column({ type: "float" })
  percentage: number;

  @CreateDateColumn()
  completedAt: Date;
}
