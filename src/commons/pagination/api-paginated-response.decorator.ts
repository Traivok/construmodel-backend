import { applyDecorators, Type }                        from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PageDto }                                      from './page.dto';

export const ApiPaginatedResponse = <TModel extends Type<unknown>>(model: TModel) =>
  applyDecorators(
    ApiExtraModels(PageDto, model),
    ApiOkResponse({
      description: 'Successfully received model list',
      schema:      {
        required: [ 'data' ],
        allOf:    [
          { $ref: getSchemaPath(PageDto) },
          {
            properties: {
              data: {
                type:  'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );