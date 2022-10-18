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

  public get currentSprint(): Sprint | null {
    if (!Array.isArray(this.sprints) || this.sprints.length === 0)
      return null;

    return this.sprints.find(s => s.current) ?? null;
  }

  public get nextSprint(): Sprint | null {
    if (!Array.isArray(this.sprints) || this.sprints.length === 0)
      return null;

    return this.sprints
             .sort((a, b) => a.start.getTime() - b.start.getTime())
             .find(s => s.future) ?? null;

  }

  public get previousSprint(): Sprint | null {
    if (!Array.isArray(this.sprints) || this.sprints.length === 0)
      return null;

    return this.sprints
             .sort((a, b) => b.start.getTime() - a.start.getTime())
             .find(s => s.past) ?? null;
  }

  public get completion(): { actual: number, planned: number } {
    const sprint = this.currentSprint ?? this.previousSprint;

    if (sprint === null)
      return { actual: 1, planned: 1 };

    const { actual, planned } = sprint.progresses.reduce((prev: { actual: number, planned: number }, curr) => ( {
      actual:  prev.actual + curr.currentFloor,
      planned: prev.planned + curr.plannedFloor,
    } ), { actual: .0, planned: .0 });

    return {
      actual:  actual / ( this.floorCount * sprint.progresses.length ),
      planned: planned / ( this.floorCount * sprint.progresses.length ),
    };
  }

  public get late(): boolean {
    const { actual, planned } = this.completion;
    return planned > actual;
  }
}
