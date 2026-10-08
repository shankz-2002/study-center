import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import "reflect-metadata";

import { RoleType } from "../types/user.js";
import { UserTopicCompletion } from "./userTopicCompletion.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  firstName: string;

  @Column({ type: "varchar" })
  lastName: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({
    type: "enum",
    enum: RoleType,
    default: RoleType.USER,
  })
  role: RoleType;

  @Column({ unique: true, type: "varchar" })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    () => UserTopicCompletion,
    (completion) => completion.user
  )
  topicCompletions: UserTopicCompletion[];
}