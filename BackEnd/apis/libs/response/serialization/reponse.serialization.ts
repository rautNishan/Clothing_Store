import { ApiProperty } from '@nestjs/swagger';
import { IPaginationMeta } from '../interfaces/response.interface';

export class ResponseMetadataSerialization {
  languages: string[];
  timestamp: number;
  timezone: string;
  requestId: string;
  path: string;
  version: string;
  [key: string]: any;
}

export class ResponseSerialization {
  @ApiProperty({
    name: 'statusCode',
    type: Number,
    required: true,
    nullable: false,
    description: 'returns specific status code for every endpoints',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    name: 'message',
    required: true,
    nullable: false,
    description: 'Message of response endpoint',
    oneOf: [
      {
        type: 'string',
        example: 'success',
      },
      {
        type: 'object',
        example: {
          message: 'Success',
          description: 'This is Success Message',
        },
      },
    ],
  })
  message: string | Record<string, any>;

  @ApiProperty({
    name: '_metadata',
    required: false, //todo
    nullable: true, //todo
    description: 'Contains metadata about API',
    type: 'object',
    example: {
      language: ['en'],
      timestamp: 1010,
      timezone: 'Nepal/kathmandu',
      requestId: '0101',
      path: 'api/v1/api_path',
      version: '1',
    },
  })
  _metaData?: ResponseMetadataSerialization; //todo
}

export class ResponsePaginationSerialization extends ResponseSerialization {
  @ApiProperty({
    name: '_pagination',
    required: true,
    nullable: false,
    description: 'Pagination Meta',
    type: 'object',
    example: {
      totalPage: 1,
      total: 20,
      limit: 10,
      page: 1,
    },
  })
  _pagination: IPaginationMeta;
}
