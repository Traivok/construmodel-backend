import { ApiProperty }                from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { UserRoles }                  from '../enums/user-roles';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  @ApiProperty({ format: 'email' })
  email: string;

  @Expose()
  username: string;

  @Expose()
  @ApiProperty({ enum: UserRoles })
  role: UserRoles;

  @Expose()
  createdAt: Date;
}