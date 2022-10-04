import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude }                                                                                    from 'class-transformer';
import { Logger }                                                                         from '@nestjs/common';
import { Project }                                                                        from './project.entity';
import { Task }                                                                           from './task.entity';

@Entity('stage')
export class Stage {
  @Exclude()
  private readonly logger = new Logger(Stage.name);

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Project, project => project.stages, { cascade: true, nullable: false })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @OneToMany(type => Task, task => task.stage)
  tasks: Task[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
