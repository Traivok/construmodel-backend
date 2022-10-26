import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { WorkFront }                                            from './work-front.entity';
import { isSunday, previousSunday }                             from 'date-fns/fp';
import { Building }                                             from './building.entity';

@Entity('execution')
export class Execution {
  @PrimaryColumn({ name: 'work_front_name' })
  workFrontName: string;

  @PrimaryColumn({ name: 'building_id' })
  buildingId: number;

  @ManyToOne(() => WorkFront, workFront => workFront.plans)
  @JoinColumn({ name: 'work_front_name' })
  workFront!: WorkFront;

  @ManyToOne(() => Building, building => building.executions)
  @JoinColumn({ name: 'building_id' })
  building!: Building;

  @PrimaryColumn()
  date: Date;

  @Column({ nullable: false, type: 'float' })
  floor: number;

  public get sunday(): Date {
    const sunday: Date = isSunday(this.date) ? this.date : previousSunday(this.date);
    sunday.setHours(0, 0, 0, 0);
    return sunday;
  }
}
