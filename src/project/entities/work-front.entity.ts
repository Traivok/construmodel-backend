import { Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Building }                                     from './building.entity';
import { Plan }                                         from './plan.entity';
import { Execution }                                    from './execution.entity';
import { ProgressView }                                 from './progress.view.entity';

@Entity('work_front')
export class WorkFront {
  @PrimaryColumn()
  name: string;

  @ManyToMany(() => Building, building => building.workFronts)
  buildings?: Building[];

  @OneToMany(() => Plan, plan => plan.workFront)
  plans: Plan[];

  @OneToMany(() => Execution, execution => execution.workFront)
  executions: Execution[];

  @OneToMany(() => ProgressView, progress => progress.workFront)
  progressesView: ProgressView[];
}
