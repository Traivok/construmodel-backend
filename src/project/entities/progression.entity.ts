import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { WorkFront }                                            from './work-front.entity';
import { Sprint }                                               from './sprint.entity';


@Entity('Progression')
export class Progression {
  @PrimaryColumn({ name: 'work_front_id' })
  workFrontId: number;

  @PrimaryColumn({ name: 'sprint_id' })
  sprintId: number;

  @ManyToOne(() => WorkFront, workFront => workFront.progressions, { cascade: true, nullable: false })
  @JoinColumn({ name: 'work_front_id' })
  workFront: WorkFront;

  @ManyToOne(() => Sprint, sprint => sprint.progressions, { cascade: true, nullable: false })
  @JoinColumn({ name: 'sprint_id' })
  sprint: Sprint;

  @Column({ nullable: false, default: 0, type: 'float', name: 'current_floor' })
  currentFloor: number;

  @Column({ nullable: false, type: 'float', name: 'planned_floor' })
  plannedFloor: number;
}
