import { Expose } from 'class-transformer';

export class TaskDto {
  @Expose()
  workFrontName: string;

  @Expose()
  planned: number;

  @Expose()
  done: number;

  @Expose()
  late: boolean;
}