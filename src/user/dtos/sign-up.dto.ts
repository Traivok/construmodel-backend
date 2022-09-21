import { IsEmail, IsString } from 'class-validator';
import { ApiProperty }       from '@nestjs/swagger';
import { Transform }         from 'class-transformer';

export class SignUpDto {
  @IsString()
  @ApiProperty({ example: 'John' })
  firstname: string;

  @IsString()
  @ApiProperty({ example: 'Doe' })
  lastname: string;

  @IsEmail()
  @ApiProperty({ example: 'john.doe@company.com', format: 'email' })
  email: string;

  @Transform(({ value }) => value.toLocaleLowerCase())
  @IsString()
  @ApiProperty({ example: 'john_doe' })
  username: string;

  @IsString()
  @ApiProperty({ format: 'password' })
  password: string;
}

