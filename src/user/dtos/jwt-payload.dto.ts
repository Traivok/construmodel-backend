import { ApiExposedProperty } from '../../commons/decorators/api-exposed-property.decorator';
import { UserRoles }          from '../enums/user-roles';

export class JwtPayloadDto {
  @ApiExposedProperty()
  id: number;

  @ApiExposedProperty({ apiOptions: { required: false, enum: UserRoles } })
  role?: UserRoles;
}
