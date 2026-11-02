import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PasswordResetToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  userId: string;

  @Column({ type: "varchar" })
  token: string;

  @Column({ type: "timestamp" })
  expiresAt: Date;
}
