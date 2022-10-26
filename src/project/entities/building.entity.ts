import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude }                                                                                    from 'class-transformer';
import { Logger }                                                                                     from '@nestjs/common';
import { WorkFront }                                                                                  from './work-front.entity';
import { Sprint }                                                                                     from './sprint.entity';
import { Execution }                                                                                  from './execution.entity';

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
    inverseJoinColumn: { name: 'work_front_name', referencedColumnName: 'name' },
  })
  workFronts?: WorkFront[];

  @OneToMany(() => Sprint, sprint => sprint.building)
  sprints: Sprint[];

  @OneToMany(() => Execution, progress => progress.building)
  executions: Execution[];

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


  public get workFrontCount(): number | undefined {
    return this.workFronts?.length;
  }

  /**
   * @return [planned, actual]
   */
  private get completion(): [ number, number ] {
    const sprint = this.currentSprint ?? this.previousSprint;

    if (sprint === null || this.workFrontCount === undefined)
      return [ 1, 1 ];

    return [ 0, 0 ];
  }

  public get plannedCompletion(): number {
    return this.completion[0];
  }

  public get actualCompletion(): number {
    return this.completion[1];
  }
}
