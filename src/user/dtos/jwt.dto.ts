import { ApiExposedProperty } from '../../commons/decorators/api-exposed-property.decorator';

export class JwtDto {
  @ApiExposedProperty()
  access_token: string;
}
