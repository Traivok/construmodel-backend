import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Building }                                                                 from './building.entity';
import { Progression }                                                              from './progression.entity';

@Entity('sprint')
export class Sprint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @ManyToOne(() => Building, building => building.sprints, { cascade: true, nullable: false })
  @JoinColumn({ name: 'building_id' })
  building: Building;

  @OneToMany(() => Progression, progression => progression.sprint)
  progressions: Progression[];
}