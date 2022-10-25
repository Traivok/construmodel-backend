import { IsDate }        from 'class-validator';
import { ApiProperty }   from '@nestjs/swagger';
import { Transform }     from 'class-transformer';
import { SprintService } from '../services/sprint.service';

export class CreateSprintDto {
  @IsDate()
  @Transform(({ value }): Date => SprintService.forceSunday(new Date(value)))
  @ApiProperty()
  start: Date;
}