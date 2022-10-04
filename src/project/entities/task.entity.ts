import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, Unique,
  UpdateDateColumn,
}                          from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Logger }          from '@nestjs/common';
import { Stage }   from './stage.entity';

@Entity('task')
@Unique(['next_task_id', 'stage_id'])
export class Task {
  @Exclude()
  private readonly logger = new Logger(Task.name);

  @Column()
  name: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  stage_id: number;

  @Column({ nullable: true })
  next_task_id: number;

  @ManyToOne(type => Stage, (stage) => stage.id)
  @JoinColumn({ name: "stage_id"})
  stage: Stage;

  @ManyToOne(type => Task, (task) => task.id)
  @JoinColumn({ name: 'next_task_id'})
  nextTask: Task;

  @Column({ nullable: false , name: 'expected_at'})
  expectedAt: Date;

  @Column({ nullable: true, default: null, name: 'completed_at'})
  completedAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  get done(): boolean {
    return this.completedAt !== null && this.completedAt !== undefined;
  }

  get late(): boolean {
    return this.expectedAt.getTime() < Date.now();
  }
}
