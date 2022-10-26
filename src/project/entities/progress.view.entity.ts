import { DataSource, JoinColumn, ManyToOne, ViewColumn, ViewEntity } from 'typeorm';
import { Plan }                                                      from './plan.entity';
import { Sprint }                                                    from './sprint.entity';
import { Execution }                                                 from './execution.entity';
import { WorkFront }                                                 from './work-front.entity';

@ViewEntity({
  name:       'progress_view',
  expression: (dataSource: DataSource) =>
                dataSource.createQueryBuilder()
                  .select([ 'pl.sprint_id', 'pl.work_front_name' ])
                  .distinctOn([ 'pl.sprint_id', 'pl.work_front_name' ])
                  .addSelect([
                    'pl.floor AS planned_floor',
                    'COALESCE(pg.floor, 0) AS current_floor',
                    'COALESCE(pg.date, (s.start + \'8d23h59m59s999ms\'::interval)) AS progression_date',
                    '(COALESCE(pg.floor, 0) < pl.floor) AS late',
                  ])
                  .from(Plan, 'pl')
                  .innerJoin(Sprint, 's', 's.id = pl.sprintId')
                  .leftJoin(Execution, 'pg', 'pg.buildingId = s.buildingId ' +
                                             ' AND ' +
                                             ' pg.workFrontName = pl.workFrontName ' +
                                             ' AND ' +
                                             ' pg.date < (s.start + \'8d23h59m59s999ms\'::interval)')
                  .orderBy({
                    'pl.sprint_id':       'ASC',
                    'pl.work_front_name': 'ASC',
                    'progression_date':   'DESC',
                  }),
})
export class ProgressView {
  @ViewColumn({ name: 'work_front_name' })
  workFrontName: string;

  @ManyToOne(() => WorkFront, workFront => workFront.plans)
  @JoinColumn({ name: 'work_front_name' })
  workFront!: WorkFront;

  @ViewColumn({ name: 'sprint_id' })
  sprintId: number;

  @ManyToOne(() => Sprint, sprint => sprint.plans)
  @JoinColumn({ name: 'sprint_id' })
  sprint!: Sprint;

  @ViewColumn({ name: 'planned_floor' })
  plannedFloor: number;

  @ViewColumn({ name: 'current_floor' })
  currentFloor: number;

  @ViewColumn({ name: 'progression_date' })
  progressionDate: Date;

  @ViewColumn()
  late: boolean;
}
