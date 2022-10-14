import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Building }                                                                  from './building.entity';
import { Progress }                                                                  from './progress.entity';

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
}

