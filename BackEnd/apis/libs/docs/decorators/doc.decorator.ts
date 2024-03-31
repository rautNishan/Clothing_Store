import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiExtraModels,
  ApiHeader,
  ApiHeaders,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseSerialization } from 'libs/response/serialization/reponse.serialization';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '../constants/doc.enum.constant';
import { IAppDocOptions } from '../interfaces/doc.interfaces';

export function DocDefault(options: IAppDocOptions): MethodDecorator {
  const docs: MethodDecorator[] = [];
  const schema: Record<string, any> = {
    allOf: [{ $ref: getSchemaPath(ResponseSerialization) }],
    properties: {
      message: {
        example: options.defaultMessagePath,
      },
      statusCode: {
        type: 'number',
        example: options.statusCode,
      },
    },
  };
  // if (options?.serialization) {
  //   docs.push(ApiExtraModels(options.serialization));
  //   schema.properties = {
  //     ...schema.properties,
  //     data: {
  //       $ref: getSchemaPath(options.serialization),
  //     },
  //   };
  // }
  return applyDecorators(
    ApiExtraModels(ResponseSerialization),
    ApiResponse({
      status: options.httpStatus,
      schema,
    }),
    ...docs,
  );
}

export function ApiDoc(options: IAppDocOptions): MethodDecorator {
  const docs: Array<ClassDecorator | MethodDecorator> = [];
  //Auth Doc
  if (options.jwtAccessToken === undefined || options.jwtAccessToken === null) {
    options.jwtAccessToken = true;
  }
  if (options?.jwtAccessToken) {
    docs.push(ApiBearerAuth('accessToken'));
  }
  if (options?.jwtRefreshToken) {
    docs.push(ApiBearerAuth('refreshToken'));
  }
  if (options?.apiKey) {
    docs.push(ApiBearerAuth());
  }
  if (options?.google) {
    docs.push(ApiBearerAuth());
  }
  if (options?.headers) {
    const headers: MethodDecorator[] = options?.headers?.map((header) =>
      ApiHeader(header),
    );
    docs.push(...headers);
  }

  //Default Success Doc
  if (options.serialization && options.defaultStatusCode) {
    docs.push(ApiExtraModels(options.serialization));
    const schema: Record<string, any> = {
      allOf: [
        {
          $ref: getSchemaPath(options.serialization),
        },
      ],
      properties: {
        message: {
          example: options.defaultMessagePath,
        },
        statusCode: {
          type: 'number',
          example: options.defaultStatusCode,
        },
      },
    };

    // schema.properties = {
    //   ...schema.properties,
    //   data: {},
    // };

    docs.push(
      ApiResponse({
        status: options.defaultStatusCode,
        schema,
      }),
    );
  }

  //First Doc
  docs.push(
    ApiOperation({
      summary: options?.summary,
      description: options?.description,
      deprecated: options?.deprecated,
      operationId: options?.operation,
    }),

    ApiHeaders([]),
    DocDefault({
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      defaultMessagePath: 'Internal Server Error',
    }),
    DocDefault({
      httpStatus: HttpStatus.REQUEST_TIMEOUT,
      statusCode: HttpStatus.REQUEST_TIMEOUT,
      defaultMessagePath: 'Request Time Out',
    }),
  );

  //RequestBody Type Doc
  if (options?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.FORM_DATA) {
    docs.push(ApiConsumes('multipart/form-data'));
  } else if (options?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.TEXT) {
    docs.push(ApiConsumes('text/plain'));
  } else if (options?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.JSON) {
    docs.push(ApiConsumes('application/json'));
  }

  //Params Doc
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

  if (options?.headers) {
    const headers: MethodDecorator[] = options?.headers?.map((header) =>
      ApiHeader(header),
    );
    docs.push(...headers);
  }

  return applyDecorators(...docs);
}
