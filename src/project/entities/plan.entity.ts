import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { WorkFront }                                            from './work-front.entity';
import { Sprint }                                               from './sprint.entity';

@Entity('plan')
export class Plan {
  @PrimaryColumn({ name: 'work_front_name' })
  workFrontName: string;

  @ManyToOne(() => WorkFront, workFront => workFront.plans)
  @JoinColumn({ name: 'work_front_name' })
  workFront!: WorkFront;

  @PrimaryColumn({ name: 'sprint_id' })
  sprintId: number;

  @ManyToOne(() => Sprint, sprint => sprint.plans)
  @JoinColumn({ name: 'sprint_id' })
  sprint!: Sprint;

  @Column({ nullable: false, type: 'float' })
  floor: number;
}
