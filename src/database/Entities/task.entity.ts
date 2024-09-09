import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@/src/database/Entities/user.entity';

@Entity({
  name: 'Tasks',
})
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 64,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  description: string;

  @Column({ default: false, type: 'boolean' })
  done: boolean;

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt: Date;
}
