import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { WorkFront }                                                                            from './work-front.entity';
import { Sprint }                                                                               from './sprint.entity';


@Entity('progress')
export class Progress {
  @PrimaryColumn({ name: 'work_front_name' })
  workFrontName: string;

  @ManyToOne(() => WorkFront, workFront => workFront.progresses)
  @JoinColumn({ name: 'work_front_name' })
  workFront!: WorkFront;

  @PrimaryColumn({ name: 'sprint_id' })
  sprintId: number;

  @ManyToOne(() => Sprint, sprint => sprint.progresses)
  @JoinColumn({ name: 'sprint_id' })
  sprint!: Sprint;

  @Column({ nullable: false, default: 0, type: 'float', name: 'current_floor' })
  currentFloor: number;

  @Column({ nullable: false, type: 'float', name: 'planned_floor' })
  plannedFloor: number;
}
