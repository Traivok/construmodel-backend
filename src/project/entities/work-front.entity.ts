import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany, PrimaryColumn,
  PrimaryGeneratedColumn, Unique,
}                   from 'typeorm';
import { Exclude }  from 'class-transformer';
import { Logger }   from '@nestjs/common';
import { Building } from './building.entity';
import { Progress } from './progress.entity';

@Entity('work_front')
export class WorkFront {
  @PrimaryColumn()
  name: string;

  @ManyToMany(() => Building, building => building.workFronts)
  buildings?: Building[];

  @OneToMany(() => Progress, progress => progress.workFront)
  progresses: Progress[];
}
