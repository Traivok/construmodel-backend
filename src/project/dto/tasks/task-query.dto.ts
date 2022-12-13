import { Expose } from 'class-transformer';

export class TaskQueryDto {
  @Expose()
  workFrontName?: string;

  @Expose()
  sprintId?: number;

  @Expose()
  late?: boolean;
}
