import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiExtraModels,
  ApiHeaders,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseSerialization } from 'libs/response/serialization/reponse.serialization';
import {
  IDocAuthOptions,
  IDocDefaultOptions,
  IDocOptions,
  IDocRequestOptions,
} from '../interfaces/doc.interfaces';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '../constants/doc.enum.constant';

export function DocDefault<T>(options: IDocDefaultOptions): MethodDecorator {
  const docs: any[] = [];
  const schema: Record<string, any> = {
    allOf: [{ $ref: getSchemaPath(ResponseSerialization<T>) }],
    properties: {
      message: {
        example: options.messagePath,
      },
      statusCode: {
        type: 'number',
        example: options.statusCode,
      },
    },
  };
  if (options?.serialization) {
    docs.push(ApiExtraModels(options.serialization));
    schema.properties = {
      ...schema.properties,
      data: {
        $ref: getSchemaPath(options.serialization),
      },
    };
  }
  return applyDecorators(
    ApiExtraModels(ResponseSerialization<T>),
    ApiResponse({
      status: options.httpStatus,
      schema,
    }),
    ...docs,
  );
}

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

    DocDefault({
      httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
      messagePath: 'http.serverError.serviceUnavailable',
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
    }),
    DocDefault({
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      messagePath: 'http.internalError.internalServerError',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    }),
    DocDefault({
      httpStatus: HttpStatus.REQUEST_TIMEOUT,
      messagePath: 'http.requestError.requestTimeOut',
      statusCode: HttpStatus.REQUEST_TIMEOUT,
    }),
  );
}

export function DocRequest(options?: IDocRequestOptions) {
  const docs: Array<ClassDecorator | MethodDecorator> = [];

  if (options?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.FORM_DATA) {
    docs.push(ApiConsumes('multipart/form-data'));
  } else if (options?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.TEXT) {
    docs.push(ApiConsumes('text/plain'));
  } else if (options?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.JSON) {
    docs.push(ApiConsumes('application/json'));
  }

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
