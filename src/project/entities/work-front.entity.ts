import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, Unique,
}                      from 'typeorm';
import { Exclude }     from 'class-transformer';
import { Logger }      from '@nestjs/common';
import { Building }    from './building.entity';
import { Progression } from './progression.entity';

@Entity('work_front')
@Unique([ 'name' ])
export class WorkFront {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Building, building => building.workFronts)
  buildings?: Building[];

  @OneToMany(() => Progression, progression => progression.workFront)
  progressions: Progression[];
}
