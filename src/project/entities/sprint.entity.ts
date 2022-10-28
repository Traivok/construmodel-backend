import { Check, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task }                                                     from './task.entity';

export enum SprintStatus {
  FUTURE  = 'FUTURE',
  CURRENT = 'CURRENT',
  PAST    = 'PAST'
}

@Entity('sprint')
@Check(' "start" < "end" ')
export class Sprint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  start: Date;

  @Column({ nullable: false, unique: true })
  end: Date;

  @OneToMany(() => Task, task => task.sprint)
  tasks: Task[];

  public get status(): SprintStatus {
    const now: number = Date.now();
    const start       = this.start.getTime();
    const end         = this.end.getTime();

    if (start < now && now <= end)
      return SprintStatus.CURRENT;
    else if (end < now)
      return SprintStatus.FUTURE;
    else
      return SprintStatus.PAST;
  }

  public get progress(): { late: boolean; planned: number; done: number } {
    if (!Array.isArray(this.tasks))
      return { done: 1, planned: 1, late: false };

    const { done, planned } = this.tasks.reduce((prev, curr) => ( {
        planned: prev.planned + curr.planned / curr.workFront.floors,
        done:    prev.done + curr.done / curr.workFront.floors,
      } ),
      { done: 0, planned: 0 },
    );

    return {
      done:    done / this.tasks.length,
      planned: planned / this.tasks.length,
      late:    done < planned,
    };
  }

}