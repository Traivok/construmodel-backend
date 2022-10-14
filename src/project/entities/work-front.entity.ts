import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude }                                                                                    from 'class-transformer';
import { Logger }                                                                                     from '@nestjs/common';
import { Building }                                                                                   from './building.entity';
import { Floor }                                                                                      from './Floor.entity';

@Entity('work_front')
export class WorkFront {
  @Exclude()
  private readonly logger = new Logger(WorkFront.name);

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Building, building => building.workFronts, { cascade: true, nullable: false })
  @JoinColumn({ name: 'building_id' })
  building: Building;

  @OneToMany(() => Floor, floor => floor.workFront)
  floors: Floor[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  public get plannedProgress(): number {
    return this.floors.filter(floor => floor.expectedAt.getTime() <= Date.now()).length / this.floors.length;
  }

  public get actualProgress(): number {
    return this.floors.filter(floor => floor.done).length / this.floors.length;
  }

  public get missingFloors(): boolean {
    return this.floors.length !== this.building.floorCount;
  }
}
