import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Task } from '@/src/database/Entities/task.entity';

@Entity({
  name: 'Users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 256,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 256,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 256,
  })
  password: string;

  @Column({default: 1})
  role: number

  @OneToMany(() => Task, (task) => task.user, {
    cascade: true,
  })
  tasks: Task[];

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt: Date;
}
