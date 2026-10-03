import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuestionType } from "../types/question.js";
import { Level } from "./level.js";

@Entity()
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  question: string;

  @Column({ type: "enum", enum: QuestionType })
  questionType: QuestionType;

  @Column({ type: "jsonb", nullable: true })
  options: string[] | null;

  @Column({ type: "jsonb" })
  correctAnswer: string | string[];

  @Column({ type: "text", nullable: true })
  explanation: string | null;

  @Column({ type: "int" })
  order: number;

  @ManyToOne(() => Level, (level) => level.questions, {
    onDelete: "CASCADE",
  })
  level: Level;
}
