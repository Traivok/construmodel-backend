import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
}                    from 'typeorm';
import { WorkFront } from './work-front.entity';
import { Sprint }    from './sprint.entity';

@Entity('task')
@Check(' "planned" >= 0 AND "done" >= 0 ')
export class Task {
  @PrimaryColumn({ name: 'work_front_name' })
  workFrontName: string;

  @ManyToOne(() => WorkFront, workFront => workFront.tasks, { nullable: false, cascade: true })
  @JoinColumn({ name: 'work_front_name' })
  workFront: WorkFront;

  @PrimaryColumn({ name: 'sprint_id' })
  sprintId: number;

  @ManyToOne(() => Sprint, sprint => sprint.tasks, { nullable: false, cascade: true })
  @JoinColumn({ name: 'sprint_id' })
  sprint!: Sprint;

  @Column({ nullable: false, type: 'float', default: 0 })
  planned: number;

  @Column({ nullable: false, type: 'float', default: 0 })
  done: number;

  public get late(): boolean {
    return this.done < this.planned;
  }

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}