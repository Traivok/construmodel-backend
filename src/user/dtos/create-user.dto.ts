import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional }      from '@nestjs/swagger';
import { Transform }                             from 'class-transformer';
import { UserRoles }                             from '../enums/user-roles';

export class CreateUserDto {
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

  @IsEnum(UserRoles)
  @ApiPropertyOptional({ enum: UserRoles, default: UserRoles.USER })
  @IsOptional()
  role: UserRoles;
}
