import { Check, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Task }                                            from './task.entity';

export const WorkFront_NAME_LENGTH = 128;

@Entity('work_front')
@Check(' "floors" > 0 ')
export class WorkFront {
  @PrimaryColumn({ unique: true, nullable: false, length: 128 })
  name: string;

  @Column()
  floors: number;

  @OneToMany(() => Task, task => task.workFront)
  tasks: Task[];
}
