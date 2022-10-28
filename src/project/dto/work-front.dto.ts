import { Expose } from 'class-transformer';

export class WorkFrontDto {
  @Expose()
  name: string;

  @Expose()
  floors: number;
}
