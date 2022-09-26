import { ApiExposedProperty } from '../../commons/decorators/api-exposed-property.decorator';

export class JwtDto {
  @ApiExposedProperty({
    apiOptions: { name: 'access_token' }
  })
  access_token: string;
}
