import { Expose } from 'class-transformer';

export class BuildingDto {
  @Expose()
  id: number;

  @Expose()
  startAt: Date;

  @Expose()
  plannedEnding: Date;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  imageUrl: string;
}