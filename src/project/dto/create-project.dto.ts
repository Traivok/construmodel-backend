import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ type: 'file', required: true })
  file: Express.Multer.File;
}