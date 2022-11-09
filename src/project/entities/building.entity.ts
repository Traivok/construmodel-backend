import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Sprint }                                            from './sprint.entity';

@Entity('building')
export class Building {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'started_at', type: 'date' })
  startedAt: Date;

  @Column({ name: 'planned_ending', type: 'date' })
  plannedEnding: Date;

  @Column({ length: 64 })
  name: string;

  @Column({ length: 512 })
  description: string;

  @Column({ name: 'image_url', length: 128, nullable: true })
  imageUrl?: string;

  @OneToMany(() => Sprint, sprint => sprint.building)
  sprints: Sprint[];
}