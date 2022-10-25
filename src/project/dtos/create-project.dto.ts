import { ApiProperty }        from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ type: 'file', required: true })
  file: Express.Multer.File;
}