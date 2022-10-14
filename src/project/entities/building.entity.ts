import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude }                                                                                    from 'class-transformer';
import { Logger }                                                                                     from '@nestjs/common';
import { WorkFront }                                                                                  from './work-front.entity';
import { Sprint }                                                                                     from './sprint.entity';

@Entity('building')
export class Building {
  @Exclude()
  private readonly logger = new Logger(Building.name);

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'floor_count', type: 'integer' })
  floorCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToMany(() => WorkFront, workFront => workFront.buildings, { cascade: true })
  @JoinTable({
    name:              'buildings_rel_work_fronts',
    joinColumn:        { name: 'building_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  workFronts?: WorkFront[];

  @OneToMany(() => Sprint, sprint => sprint.building)
  sprints: Sprint[];
}
