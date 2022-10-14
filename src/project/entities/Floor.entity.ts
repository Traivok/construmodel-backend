import { BeforeInsert, Check, Column, Entity, InsertEvent, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { WorkFront }                                                                              from './work-front.entity';
import { BadRequestException }                                                                    from '@nestjs/common';

@Entity('Floor')
@Check('floor_number > 0')
export class Floor {
  @PrimaryColumn({ name: 'floor_number' })
  floorNumber: number;

  @PrimaryColumn({ name: 'work_front_id' })
  workFrontId: number;

  @ManyToOne(() => WorkFront, workFront => workFront.id)
  @JoinColumn({ name: 'work_front_id' })
  workFront: WorkFront;

  @Column({ nullable: false, name: 'expected_at' })
  expectedAt: Date;

  @Column({ nullable: true, default: null, name: 'completed_at' })
  completedAt: Date;

  get done(): boolean {
    return this.completedAt !== null && this.completedAt !== undefined;
  }

  get late(): boolean {
    if (this.done) {
      return this.completedAt.getTime() > this.expectedAt.getTime();
    } else {
      return Date.now() > this.expectedAt.getTime();
    }
  }

  @BeforeInsert()
  public checkFloorCount(e: InsertEvent<Floor>) {
    if (e.entity.floorNumber > e.entity.workFront.building.floorCount)
      throw new BadRequestException('This floor number is higher than the building\'s floors.');
  }
}