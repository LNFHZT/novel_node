import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  created_at: number;
  @Column()
  updated_at: number;
}