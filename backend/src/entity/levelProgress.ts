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



  @Column({ type: "int", nullable: true })
  score: number | null;

  @Column({ type: "float", nullable: true })
  percentage: number | null;

  @Column({ type: "timestamp", nullable: true })
  completedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;
}
