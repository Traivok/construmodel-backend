import { IsInt, IsOptional, IsString } from 'class-validator';

export class TaskQueryDto {
  @IsOptional()
  @IsString()
  workFrontName?: string;

  @IsOptional()
  @IsInt()
  sprintId?: number;
}
