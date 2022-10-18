import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Building }                                                                 from './building.entity';
import { Progress }                                                                 from './progress.entity';

export enum SprintStatus {
  FUTURE  = 'FUTURE',
  CURRENT = 'CURRENT',
  PAST    = 'PAST'
}

@Entity('sprint')
export class Sprint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column({ name: 'building_id' })
  buildingId: number;

  @ManyToOne(() => Building, building => building.sprints, { cascade: true, nullable: false })
  @JoinColumn({ name: 'building_id' })
  building: Building;

  @OneToMany(() => Progress, progress => progress.sprint)
  progresses: Progress[];

  public get past(): boolean {
    return this.end.getTime() < Date.now();
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
}

