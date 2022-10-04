import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude }                                                             from 'class-transformer';
import { Logger }                                                              from '@nestjs/common';
import { Stage }                                                               from './stage.entity';

@Entity('project')
export class Project {
  @Exclude()
  private readonly logger = new Logger(Project.name);

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Stage, (stage) => stage.project)
  stages: Stage[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
