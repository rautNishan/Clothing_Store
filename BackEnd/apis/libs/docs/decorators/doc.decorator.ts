import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeaders,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import {
  IDocAuthOptions,
  IDocOptions,
  IDocRequestOptions,
} from '../interfaces/doc.interfaces';

export function Doc(options?: IDocOptions): MethodDecorator {
  const currentTimestamp: number = new Date().valueOf();
  return applyDecorators(
    ApiOperation({
      summary: options?.summary,
      description: options?.description,
      deprecated: options?.deprecated,
      operationId: options?.operation,
    }),
    ApiHeaders([
      {
        name: 'HRF',
        description: 'Hostel, Room, Flat Finder',
        required: false,
        schema: {
          default: 'HRF',
          example: 'HRF',
          type: 'string',
        },
      },
      {
        name: 'x-custom-lang',
        description: 'Custom language header',
        required: false,
        schema: {
          default: 'en',
          example: 'en',
          type: 'string',
        },
      },
      {
        name: 'x-timestamp',
        description: 'Timestamp header, in microseconds',
        required: false,
        schema: {
          default: currentTimestamp,
          example: currentTimestamp,
          type: 'number',
        },
      },
    ]),
  );
}

export function DocRequest(options?: IDocRequestOptions) {
  const docs: Array<ClassDecorator | MethodDecorator> = [];
  if (options?.params) {
    const params: MethodDecorator[] = options.params.map((param) => {
      return ApiParam(param);
    });
    docs.push(...params);
  }
  if (options?.queries) {
    const queries: MethodDecorator[] = options?.queries?.map((query) =>
      ApiQuery(query),
    );
    docs.push(...queries);
  }
  return applyDecorators(...docs);
}

export function DocAuth(options?: IDocAuthOptions) {
  const docs: Array<ClassDecorator | MethodDecorator> = [];
  if (options?.jwtAccessToken) {
    docs.push(ApiBearerAuth());
  }
  if (options?.jwtRefreshToken) {
    docs.push(ApiBearerAuth());
  }
  if (options?.apiKey) {
    docs.push(ApiBearerAuth());
  }
  if (options?.google) {
    docs.push(ApiBearerAuth());
  }
  return applyDecorators(...docs);
}
