import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Building }                                                                         from './building.entity';
import { Plan }                                                                             from './plan.entity';
import { nextSaturday }                                                                     from 'date-fns/fp';
import { ProgressView }                                                                     from './progress.view.entity';

export enum SprintStatus {
  FUTURE  = 'FUTURE',
  CURRENT = 'CURRENT',
  PAST    = 'PAST'
}

@Entity('sprint')
@Unique([ 'start', 'buildingId' ])
export class Sprint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  /**
   * @constraint should be a sunday
   */
  start: Date;

  @Column({ name: 'building_id' })
  buildingId: number;

  @ManyToOne(() => Building, building => building.sprints, { cascade: true, nullable: false })
  @JoinColumn({ name: 'building_id' })
  building: Building;

  @OneToMany(() => Plan, plan => plan.sprint)
  plans?: Plan[];

  @OneToMany(() => ProgressView, progress => progress.sprint)
  progressesView?: ProgressView[];

  public get end(): Date {
    const date = nextSaturday(this.start);
    date.setHours(23, 59, 59, 999);
    return date;
  }

  public get past(): boolean {
    return this.start.getTime() < Date.now();
  }

  public get current(): boolean {
    const now = Date.now();
    return this.start.getTime() < now && now <= this.end.getTime();
  }

  public get future(): boolean {
    return Date.now() <= this.start.getTime();
  }

  public get status(): SprintStatus {
    if (this.current)
      return SprintStatus.CURRENT;
    else if (this.future)
      return SprintStatus.FUTURE;
    else
      return SprintStatus.PAST;
  }

  /**
   * @param other
   * @return 0 if is the same, negative if this comes before than other, else positive
   */
  public compareTo(other: Sprint): number {
    return this.start.getTime() - other.start.getTime();
  }
}

