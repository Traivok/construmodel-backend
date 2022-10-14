import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude }                                                             from 'class-transformer';
import { Logger }                                                              from '@nestjs/common';
import { WorkFront }                                                           from './work-front.entity';

@Entity('building')
export class Building {
  @Exclude()
  private readonly logger = new Logger(Building.name);

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'floor_count', type: 'integer' })
  floorCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => WorkFront, workFront => workFront.building)
  workFronts: WorkFront[];

  public get missingFloors(): boolean {
    return this.workFronts.some(w => w.missingFloors);
  }
}
